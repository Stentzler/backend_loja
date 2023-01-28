import {ICustomerUpdate} from '../../interfaces/customer.interfaces';
import {ICepRequest} from '../../interfaces/vendor.interfaces';
import {AppError} from '../../utils/appError';
import getCep from '../../utils/getCep';
import Vendor from '../../models/vendor.models';
import Customer from '../../models/customer.models';

//@Descricao atualiza dados pelo ID de um determinado cliente
//@PATCH /api/vendedores/:vendorId
//@No token
const customerUpdateView = async (
	customerUpdateDetails: ICustomerUpdate,
	customerId: string
) => {
	const {email, cpf} = customerUpdateDetails;

	//Checando se a requisição não está vazia
	if (
		Object.keys(customerUpdateDetails).length === 0 &&
		customerUpdateDetails.constructor === Object
	) {
		throw new AppError(
			'Envie ao menos um dos dados descritos na documentacao deste API'
		);
	}

	// Checando Email e cpf
	if (email) {
		const emailNotUnique = await Customer.findOne({email});
		if (emailNotUnique) {
			throw new AppError('Este email já está cadastrado', 400);
		}
	}
	if (cpf) {
		const cpfNotUnique = await Customer.findOne({cpf});
		if (cpfNotUnique) {
			throw new AppError('Este CPF já está cadastrado', 400);
		}
	}

	//Pegando dados antigos do cliente
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

	// Verificando se foi enviado o id de um novo vendedor e validando o mesmo
	let vendor: any = null;

	if (customerUpdateDetails.vendedorId) {
		try {
			vendor = await Vendor.findById(customerUpdateDetails.vendedorId).lean();
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

	//Removendo variaveis do request
	const {
		cep,
		dataDeNascimento,
		nomeCompleto,
		complementoResidencial,
		numeroDeResidencia,
		vendedorId,
		...updateCustomerData
	} = customerUpdateDetails;

	//Fazendo requisicao de endereco caso novo CEP tenha sido enviado
	let addressInfo;
	if (cep) {
		const response: ICepRequest = await getCep(cep);
		addressInfo = response;
	} else {
		addressInfo = customer.endereco;
	}
	// Inserindo número e complemento (caso atualizados) junto ao endereco
	addressInfo.numero = numeroDeResidencia ?? customer.endereco.numero;
	addressInfo.complemento =
		complementoResidencial ?? customer.endereco.complemento;

	// Converter datas de string para Date
	let dataDeNascimentoUpdate;
	if (dataDeNascimento) {
		dataDeNascimentoUpdate =
			new Date(dataDeNascimento) ?? customer.dataDeNascimento;
	}

	// Passando Nome para Uppercase
	let nomeCompletoUpdated;
	if (nomeCompleto) {
		nomeCompletoUpdated = nomeCompleto.toUpperCase();
	}

	//Updating costumer
	try {
		const updatedCostumer = await Customer.findByIdAndUpdate(
			customer._id,
			{
				...updateCustomerData,
				nomeCompleto: nomeCompletoUpdated ?? customer.nomeCompleto,
				endereco: addressInfo,
				dataDeNascimento: dataDeNascimentoUpdate
					? dataDeNascimentoUpdate
					: customer.dataDeNascimento,
				vendedor: vendor ? vendor._id : customer.vendedor,
			},
			{new: true}
		);
		return updatedCostumer;
	} catch (error: any) {
		throw new AppError(error.message, 400);
	}
};

export default customerUpdateView;
