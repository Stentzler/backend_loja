import {Schema} from 'mongoose';
import {ICepRequest, IVendorRequest} from '../../interfaces/vendor.interfaces';
import Vendor, {IVendor} from '../../models/vendor.models';
import {AppError} from '../../utils/appError';
import getCep from '../../utils/getCep';

//@Descricao Cria um novo vendedor
//@POST /api/vendedores
//@No token
const vendorCreateView = async (
	vendorDetails: IVendorRequest
): Promise<IVendor> => {
	const {email, cpf}: {email: string; cpf: string} = vendorDetails;

	const emailNotUnique = await Vendor.findOne({email});
	if (emailNotUnique) {
		throw new AppError('Este email já está cadastrado', 400);
	}

	const cpfNotUnique = await Vendor.findOne({cpf});
	if (cpfNotUnique) {
		throw new AppError('Este CPF já está cadastrado', 400);
	}

	//Removendo variaveis de Details
	const {
		cep,
		horarioDeEntrada,
		horarioDeSaida,
		dataDeContratacao,
		dataDeNascimento,
		...createVendorData
	} = vendorDetails;

	//Fazendo requisicao de endereco
	const addressInfo: ICepRequest = await getCep(cep);

	//Inserindo número e complemento junto ao endereco
	addressInfo.numero = vendorDetails.numeroDeResidencia;
	addressInfo.complemento = vendorDetails.complementoResidencial ?? '';

	//Converter datas de string para Date
	const convertedDataDeContratacao = new Date(dataDeContratacao);
	const convertedDataDeNascimento = new Date(dataDeNascimento);

	//Registrando vendedor
	try {
		const vendor: IVendor = await Vendor.create({
			...createVendorData,
			endereco: {...addressInfo},
			horarioDeTrabalho: {
				horarioDeEntrada,
				horarioDeSaida,
			},
			dataDeContratacao: convertedDataDeContratacao,
			dataDeNascimento: convertedDataDeNascimento,
		});

		return vendor;
	} catch (error) {
		throw new AppError('Não foi possível registrar vendedor', 400);
	}
};

export default vendorCreateView;
