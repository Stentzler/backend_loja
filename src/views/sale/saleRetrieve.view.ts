import Sale from '../../models/sale.models';
import {AppError} from '../../utils/appError';

//@Descricao rota traz todos os dados da venda especificada, todos os dados do cliente que fez a compra e o nome do vendedor responsável pela venda.
//@GET /api/vendas/:vendaId
//@No token
const saleRetrieveView = async (saleId: string) => {
	let sales;
	try {
		sales = await Sale.findById(saleId)
			.populate('cliente')
			.populate('vendedor', 'nomeCompleto')
			.lean();
	} catch (error) {
		//Erro para quando o ID está em um formato inválido
		throw new AppError('Venda não encontrada, verifique o ID especificado');
	}

	if (!sales) {
		//Erro para quando o ID está no formato correto mas item não existe na DB
		throw new AppError('Venda não encontrada, verifique o ID especificado');
	}

	return sales;
};

export default saleRetrieveView;
