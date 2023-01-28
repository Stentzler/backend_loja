import * as mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
	{
		nomeCompleto: {
			type: String,
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
			numero: {
				type: String,
				required: [true, 'Número para entrega é um campo obrigatório'],
			},
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		vendedor: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, 'Informe o vendedor responsável'],
			ref: 'Vendor',
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Customer', customerSchema);
