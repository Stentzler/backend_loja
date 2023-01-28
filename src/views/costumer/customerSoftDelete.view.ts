import Customer from '../../models/customer.models';
import {AppError} from '../../utils/appError';

//@Descricao inativa o cliente (isActive = false)
//@DELETE /api/clientes/:clienteId
//@No token
const customerSoftDeleteView = async (customerId: string) => {
	let customer: any = null;

	try {
		customer = await Customer.findById(customerId).lean();
	} catch (error) {
		//Erro caso o ID esteja em um formato incorreto
		throw new AppError('Cliente não encontrado, verifique o ID especificado');
	}

	if (!customer) {
		//Erro caso nao exista cliente com aquele ID
		throw new AppError('Cliente não encontrado, verifique o ID especificado');
	}

	if (customer.isActive === false) {
		throw new AppError('Este cliente já encontra-se inativo');
	}

	//Soft Delete
	await Customer.findByIdAndUpdate(customerId, {isActive: false});

	return;
};

export default customerSoftDeleteView;
