import Vendor from '../../models/vendor.models';
import Customer from '../../models/customer.models';
import {AppError} from '../../utils/appError';
import {ISaleRequest} from '../../interfaces/sale.interfaces';
import Sale from '../../models/sale.models';

//@Descricao Cria um novo registro de venda
//@POST /api/vendas
//@No token
const saleCreateView = async (saleDetails: ISaleRequest) => {
	let vendor;
	let customer;

	//Pegando dados do vendedor responsavel
	try {
		vendor = await Vendor.findById(saleDetails.vendedorId).lean();
	} catch (error) {
		//Erro para quando o ID passado não corresponde ao ID do mongoDB
		throw new AppError('ID do vendedor não está registrado', 400);
	}

	if (!vendor) {
		//Erro para quando o ID corresponde, mas nenhum vendedor é encontrado
		throw new AppError('ID do vendedor não está registrado', 400);
	}

	//Pegando dados do cliente
	try {
		customer = await Customer.findById(saleDetails.clienteId).lean();
	} catch (error) {
		//Erro para quando o ID passado não corresponde ao ID do mongoDB
		throw new AppError('ID do cliente não está registrado', 400);
	}

	if (!customer) {
		//Erro para quando o ID corresponde, mas nenhum vendedor é encontrado
		throw new AppError('ID do clinte não está registrado', 400);
	}

	//Criando venda
	try {
		const sale = await Sale.create({
			...saleDetails,
			dataDaCompra: saleDetails.dataDaCompra ?? new Date(),
			vendedor: vendor!._id,
			cliente: customer!._id,
		});

		return sale;
	} catch (error: any) {
		throw new AppError(error.message, 400);
	}
};

export default saleCreateView;
