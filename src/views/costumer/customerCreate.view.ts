import {ICustomerRequest} from '../../interfaces/customer.interfaces';
import {ICepRequest} from '../../interfaces/vendor.interfaces';
import Vendor from '../../models/vendor.models';
import Customer from '../../models/customer.models';
import {AppError} from '../../utils/appError';
import getCep from '../../utils/getCep';

//@Descricao Cria um novo cliente
//@POST /api/clientes
//@No token
const customerCreateView = async (customerDetails: ICustomerRequest) => {
	const {email, cpf} = customerDetails;

	const emailNotUnique = await Customer.findOne({email});
	if (emailNotUnique) {
		throw new AppError('Este email já está cadastrado', 400);
	}
	const cpfNotUnique = await Customer.findOne({cpf});
	if (cpfNotUnique) {
		throw new AppError('Este CPF já está cadastrado', 400);
	}

	//Pegando dados do vendedor responsavel
	let vendor;
	try {
		vendor = await Vendor.findById(customerDetails.vendedorId);
	} catch (error) {
		//Erro para quando o ID passado não corresponde ao ID do mongoDB
		throw new AppError('ID do vendedor não está registrado', 400);
	}

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
	let addressInfo;
	const response: ICepRequest = await getCep(cep);
	addressInfo = response;

	//Inserindo número e complemento junto ao endereco
	addressInfo.numero = numeroDeResidencia;
	addressInfo.complemento = complementoResidencial ?? '';

	//Converter datas de string para Date
	const convertedDataDeNascimento = new Date(dataDeNascimento);

	//Passando Nome para Uppercase
	createCustomerData.nomeCompleto =
		createCustomerData.nomeCompleto.toUpperCase();

	//Registrando vendedor
	try {
		const customer = await Customer.create({
			...createCustomerData,
			endereco: {...addressInfo},
			dataDeNascimento: convertedDataDeNascimento,
			vendedor: vendor!._id,
		});
		return customer;
	} catch (error: any) {
		throw new AppError(error.message, 400);
	}
};

export default customerCreateView;
