import {ICepRequest, IVendorUpdate} from '../../interfaces/vendor.interfaces';
import Vendor from '../../models/vendor.models';
import {AppError} from '../../utils/appError';
import getCep from '../../utils/getCep';

//@Descricao atualiza dados pelo ID de um determinado vendedor
//@PATCH /api/vendedores/:vendorId
//@No token
const vendorUpdateView = async (
	vendorUpdateDetails: IVendorUpdate,
	vendorId: string
) => {
	const {email, cpf} = vendorUpdateDetails;

	//Checando se a requisição não está vazia
	if (
		Object.keys(vendorUpdateDetails).length === 0 &&
		vendorUpdateDetails.constructor === Object
	) {
		throw new AppError(
			'Envie ao menos um dos dados descritos na documentacao deste API'
		);
	}

	// Verificando disponibilidade do email
	if (email) {
		const emailNotUnique = await Vendor.findOne({email});
		if (emailNotUnique) {
			throw new AppError('Este email já está cadastrado', 400);
		}
	}

	if (cpf) {
		const cpfNotUnique = await Vendor.findOne({cpf});
		if (cpfNotUnique) {
			throw new AppError('Este CPF já está cadastrado', 400);
		}
	}

	//Pegando dados antigos do vendedor
	let vendor: any = null;
	try {
		vendor = await Vendor.findById(vendorId).lean();
	} catch (error) {
		//Erro caso o ID esteja em um formato incorreto
		throw new AppError('Vendedor não encontrado, verifique o ID especificado');
	}
	if (!vendor) {
		//Erro caso nao exista vendedor com aquele ID
		throw new AppError('Vendedor não encontrado, verifique o ID especificado');
	}

	//Removendo variaveis do request
	const {
		cep,
		horarioDeEntrada,
		horarioDeSaida,
		dataDeContratacao,
		dataDeNascimento,
		nomeCompleto,
		complementoResidencial,
		numeroDeResidencia,
		...updateVendorData
	} = vendorUpdateDetails;

	//Fazendo requisicao de endereco caso novo CEP tenha sido enviado
	let addressInfo;
	if (cep) {
		const response: ICepRequest = await getCep(cep);
		addressInfo = response;
	} else {
		addressInfo = vendor.endereco;
	}
	// Inserindo número e complemento junto ao endereco
	addressInfo.numero = numeroDeResidencia ?? vendor.endereco.numero;
	addressInfo.complemento =
		complementoResidencial ?? vendor.endereco.complemento;

	// Converter datas de string para Date
	let dataDeContratacaoUpdate;
	if (dataDeContratacao) {
		dataDeContratacaoUpdate =
			new Date(dataDeContratacao) ?? vendor.dataDeContratacao;
	}
	let dataDeNascimentoUpdate;
	if (dataDeNascimento) {
		dataDeNascimentoUpdate =
			new Date(dataDeNascimento) ?? vendor.dataDeNascimento;
	}

	// Passando Nome para Uppercase
	let nomeCompletoUpdated;
	if (nomeCompleto) {
		nomeCompletoUpdated = nomeCompleto.toUpperCase();
	}

	//Updating vendedor
	try {
		const updatedVendor = await Vendor.findByIdAndUpdate(
			vendor._id,
			{
				...updateVendorData,
				nomeCompleto: nomeCompletoUpdated ?? vendor.nomeCompleto,
				endereco: addressInfo,
				horarioDeTrabalho: {
					horarioDeEntrada: horarioDeEntrada
						? horarioDeEntrada
						: vendor.horarioDeTrabalho.horarioDeEntrada,
					horarioDeSaida: horarioDeSaida
						? horarioDeSaida
						: vendor.horarioDeTrabalho.horarioDeSaida,
				},
				dataDeContratacao: dataDeContratacaoUpdate
					? dataDeContratacaoUpdate
					: vendor.dataDeContratacao,
				dataDeNascimento: dataDeNascimentoUpdate
					? dataDeNascimentoUpdate
					: vendor.dataDeNascimento,
			},
			{new: true}
		);
		return updatedVendor;
	} catch (error) {
		throw new AppError(
			'Não foi possível atualizar o registro do vendedor',
			400
		);
	}
};

export default vendorUpdateView;
