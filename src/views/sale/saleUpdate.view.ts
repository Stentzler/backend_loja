import {ISaleUpdate} from '../../interfaces/sale.interfaces';
import {ICepRequest, IVendorRequest} from '../../interfaces/vendor.interfaces';
import Customer from '../../models/customer.models';
import Sale from '../../models/sale.models';
import Vendor from '../../models/vendor.models';
import {AppError} from '../../utils/appError';
import getCep from '../../utils/getCep';

//@Descricao atualiza dados de uma determinada compra
//@PATCH /api/vendas/:saleId
//@No token
const saleUpdateView = async (
	saleUpdateDetails: ISaleUpdate,
	saleId: string
) => {
	//Checando se a requisição não está vazia
	if (
		Object.keys(saleUpdateDetails).length === 0 &&
		saleUpdateDetails.constructor === Object
	) {
		throw new AppError(
			'Envie ao menos um dos dados descritos na documentacao deste API'
		);
	}

	//Pegando dados antigos do venda
	let sale: any = null;
	try {
		sale = await Sale.findById(saleId).lean();
	} catch (error) {
		//Erro caso o ID esteja em um formato incorreto
		throw new AppError('Venda não encontrado, verifique o ID especificado');
	}
	if (!sale) {
		//Erro caso nao exista cliente com aquele ID
		throw new AppError('Venda não encontrado, verifique o ID especificado');
	}

	// Verificando se foi enviado o id de um novo vendedor e validando o mesmo
	let vendor: any = null;
	if (saleUpdateDetails.vendedorId) {
		try {
			vendor = await Vendor.findById(saleUpdateDetails.vendedorId).lean();
		} catch (error) {
			//Erro caso o ID esteja em um formato incorreto
			throw new AppError(
				'Vendedor não encontrado, verifique o ID especificado'
			);
		}
		if (!vendor) {
			//Erro caso nao exista cliente com aquele ID
			throw new AppError(
				'Vendedor não encontrado, verifique o ID especificado'
			);
		}
	}

	// Verificando se foi enviado o id de um novo cliente e validando o mesmo
	let customer: any = null;
	if (saleUpdateDetails.clienteId) {
		try {
			customer = await Customer.findById(saleUpdateDetails.clienteId).lean();
		} catch (error) {
			//Erro caso o ID esteja em um formato incorreto
			throw new AppError('Cliente não encontrado, verifique o ID especificado');
		}
		if (!customer) {
			//Erro caso nao exista cliente com aquele ID
			throw new AppError('Cliente não encontrado, verifique o ID especificado');
		}
	}

	// Removendo variaveis do request
	const {dataDaCompra, clienteId, vendedorId, ...updateSaleData} =
		saleUpdateDetails;

	// Converter datas de string para Date
	let dataDaCompraUpdate;
	if (dataDaCompra) {
		dataDaCompraUpdate = new Date(dataDaCompra);
	}

	//Updating Sale
	try {
		const updatedSale = await Sale.findByIdAndUpdate(
			sale._id,
			{
				...updateSaleData,
				dataDaCompra: dataDaCompraUpdate ?? sale.dataDaCompra,
				vendedor: vendor ? vendor._id : sale.vendedor,
				cliente: customer ? customer._id : sale.customer,
			},
			{new: true}
		);
		return updatedSale;
	} catch (error: any) {
		throw new AppError(error.message, 400);
	}
};

export default saleUpdateView;
