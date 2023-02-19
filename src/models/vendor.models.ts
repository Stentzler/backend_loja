import * as mongoose from 'mongoose';

export interface IAddress extends mongoose.Document {
	cep: string;
	logradouro: string;
	complemento: string;
	bairro: string;
	localidade: string;
	uf: string;
	ibge: string;
	gia: string;
	ddd: string;
	siafi: string;
	numero: string;
}
export interface IVendor extends mongoose.Document {
	_id: Object;
	nomeCompleto: string;
	dataDeNascimento: Date;
	email: string;
	telefone: string;
	cpf: string;
	endereco: IAddress;
	dataDeContratacao: Date;
	percentualDeComissao: number;
	horarioDeTrabalho: {
		horarioDeEntrada: string;
		horarioDeSaida: string;
	};
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const vendorSchema = new mongoose.Schema(
	{
		nomeCompleto: {
			type: String,
			uppercase: true,
			required: [true, 'nome é um campo obrigatório'],
		},
		dataDeNascimento: {
			type: Date, //Formato YYYY/MM/DD
			required: [true, 'data de nascimento é um campo obrigatório'],
		},
		email: {
			type: String,
			required: [true, 'email é um campo obrigatório'],
			unique: true,
		},
		telefone: {
			type: String,
			required: [true, 'telefone é um campo obrigatório'],
		},
		cpf: {
			type: String,
			required: [true, 'cpf é um campo obrigatório'],
			unique: true,
		},
		// Pegar endereco atraves do cep
		endereco: {
			cep: {type: String},
			logradouro: {type: String},
			complemento: {type: String},
			bairro: {type: String},
			localidade: {type: String},
			uf: {type: String},
			ibge: {type: String},
			gia: {type: String},
			ddd: {type: String},
			siafi: {type: String},
			numero: {type: String},
		},
		dataDeContratacao: {
			type: Date, //Formato YYYY/MM/DD
			required: [true, 'Data de contratação é um campo obrigatório'],
		},
		percentualDeComissao: {
			type: Number,
			set: (value: Number) => value.toFixed(3),
			required: [true, 'Percentual de comissão é um campo obrigatório'],
		},
		horarioDeTrabalho: {
			horarioDeEntrada: {
				type: String,
				required: [
					true,
					'Horário de inicio do trabalho é um campo obrigatório',
				],
			},
			horarioDeSaida: {
				type: String,
				required: [
					true,
					'Horário do término do trabalho é um campo obrigatório',
				],
			},
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IVendor>('Vendor', vendorSchema);
