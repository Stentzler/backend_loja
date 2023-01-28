import Sale from '../../models/sale.models';
import Vendor from '../../models/vendor.models';
import {AppError} from '../../utils/appError';
import reportSales from '../../utils/reportSales';

//@Descricao Traz as informações de um único vendedor especificado pelo ID; resumo das vendas mensais (quantidade de vendas, valor total das vendas e comissão recebida por este vendedor) ordenadas pelo mês/ano mais recente para o mais antigo
//@GET /api/vendedores/:vendorId
//@No token
const vendorRetrieveView = async (vendorId: string) => {
	// relatorio mensal : {vendasDoMes, TotalDoMes, comissao}

	let vendorProfile: any = null;
	try {
		vendorProfile = await Vendor.findById(vendorId).lean();
	} catch (error) {
		//Erro caso o ID esteja em um formato incorreto
		throw new AppError('Cliente não encontrado, verifique o ID especificado');
	}
	if (!vendorProfile) {
		//Erro caso nao exista cliente com aquele ID
		throw new AppError('Cliente não encontrado, verifique o ID especificado');
	}

	// Pegando total de vendar por mês
	const vendorSales = await Sale.aggregate([
		{
			$match: {vendedor: vendorProfile._id},
		},
		{
			$group: {
				_id: {
					ano: {$year: '$dataDaCompra'},
					mes: {$month: '$dataDaCompra'},
				},
				valorTotal: {$sum: '$valor'},
				totalDeVendas: {$sum: 1},
			},
		},
	]);

	// Tratando data para retornar relatório
	const reportByMonth = reportSales(
		vendorSales,
		vendorProfile.percentualDeComissao
	);

	// Adicionando relatorio à informação do vendedor
	vendorProfile.relatorioDeVendasMensais = reportByMonth;

	return vendorProfile;
};

export default vendorRetrieveView;
