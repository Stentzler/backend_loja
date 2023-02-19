import {ICustomerRequest} from '../../interfaces/customer.interfaces';
import {ICepRequest} from '../../interfaces/vendor.interfaces';
import Vendor, {IVendor} from '../../models/vendor.models';
import Customer, {ICustomer} from '../../models/customer.models';
import {AppError} from '../../utils/appError';
import getCep from '../../utils/getCep';
import {isValidObjectId} from 'mongoose';

//@Descricao Cria um novo cliente
//@POST /api/clientes
//@No token
const customerCreateView = async (
	customerDetails: ICustomerRequest
): Promise<ICustomer> => {
	const {email, cpf}: {email: string; cpf: string} = customerDetails;

	const emailNotUnique = await Customer.findOne({email});
	if (emailNotUnique) {
		throw new AppError('Este email já está cadastrado', 400);
	}
	const cpfNotUnique = await Customer.findOne({cpf});
	if (cpfNotUnique) {
		throw new AppError('Este CPF já está cadastrado', 400);
	}

	//Pegando dados do vendedor responsavel

	const isValidId = isValidObjectId(customerDetails.vendedorId);
	if (!isValidId) {
		throw new AppError('ID do vendedor não está em um formato válido', 400);
	}

	const vendor: IVendor | null = await Vendor.findOne({
		_id: customerDetails.vendedorId,
	});
	if (!vendor) {
		//Erro para quando o ID corresponde, mas nenhum vendedor é encontrado
		throw new AppError('ID do vendedor não está registrado', 400);
	}

	// Removendo variaveis de Details
	const {
		cep,
		dataDeNascimento,
		numeroDeResidencia,
		complementoResidencial,
		...createCustomerData
	} = customerDetails;

	//Fazendo requisicao de endereco
	const addressInfo: ICepRequest = await getCep(cep);

	//Inserindo número e complemento junto ao endereco
	addressInfo.numero = numeroDeResidencia;
	addressInfo.complemento = complementoResidencial ?? '';

	//Converter datas de string para Date
	const convertedDataDeNascimento = new Date(dataDeNascimento);

	//Registrando vendedor
	try {
		const customer: ICustomer = await Customer.create({
			...createCustomerData,
			endereco: {...addressInfo},
			dataDeNascimento: convertedDataDeNascimento,
			vendedor: vendor._id,
		});
		return customer;
	} catch (error: any) {
		throw new AppError(error.message, 400);
	}
};

export default customerCreateView;
