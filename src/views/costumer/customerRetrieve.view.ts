import Customer from '../../models/customer.models';
import Sale from '../../models/sale.models';
import {AppError} from '../../utils/appError';

//@Descricao Traz as informações de um único cliente especificado pelo ID; Nome e ID do vendedor responsável por este cliente e todas as compras relacionadas à este cliente.
//@GET /api/clientes/:clienteId
//@No token
const customerRetrieveView = async (customerId: string) => {
	// Pegando infomações do cliente e do vendedor
	let customerProfile: any = null;

	try {
		customerProfile = await Customer.findById(customerId)
			.populate('vendedor', 'nomeCompleto')
			.lean();
	} catch (error) {
		//Erro caso o ID esteja em um formato incorreto
		throw new AppError('Cliente não encontrado, verifique o ID especificado');
	}

	if (!customerProfile) {
		//Erro caso nao exista cliente com aquele ID
		throw new AppError('Cliente não encontrado, verifique o ID especificado');
	}

	const customerPurchases = await Sale.find(
		{cliente: customerProfile._id},
		[],
		{
			sort: {
				dataDaCompra: 'desc',
			},
		}
	);

	customerProfile.registroDeCompras = customerPurchases;

	return customerProfile;
};

export default customerRetrieveView;
