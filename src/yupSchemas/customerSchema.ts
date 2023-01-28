import * as yup from 'yup';

//Validação para criação de vendedor
export const customerCreateSchema = yup
	.object()
	.shape({
		nomeCompleto: yup.string().required(),
		dataDeNascimento: yup
			.string()
			.matches(
				/^(19|20)\d\d[/](0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])$/,
				'Formato da data deve ser YYYY/MM/DD'
			)
			.required(),
		email: yup.string().required().email(),
		telefone: yup
			.string()
			.min(11, 'Telefone deve conter 11 digitos (ex: 41999990000)')
			.max(11, 'Telefone deve conter 11 digitos (ex: 41999990000)')
			.matches(/^[0-9]*$/, 'Telefone deve conter Apenas números!')
			.required(),
		cpf: yup
			.string()
			.min(11, 'CPF deve conter 11 números, sem pontos ou traços')
			.max(11, 'CPF deve conter 11 números, sem pontos ou traços')
			.matches(/^[0-9]*$/, 'CPF Apenas números!')
			.required(),
		cep: yup
			.string()
			.min(8, 'CEP deve conter 8 números, sem pontos ou traços')
			.max(8, 'CEP deve conter 8 números, sem pontos ou traços')
			.matches(/^[0-9]*$/, 'CEP Apenas números!')
			.required(),
		numeroDeResidencia: yup
			.string()
			.required('numeroDeResidencia deve ser informado'),
		complementoResidencial: yup.string(),
		vendedorId: yup.string().required('O campo vendedorId deve ser informado'),
	})
	.strict()
	.noUnknown();

//Validação para update de vendedor
export const customerUpdateSchema = yup
	.object()
	.shape({
		nomeCompleto: yup.string(),
		dataDeNascimento: yup
			.string()
			.matches(
				/^(19|20)\d\d[/](0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])$/,
				'Formato da data deve ser YYYY/MM/DD'
			),
		email: yup.string().email(),
		telefone: yup
			.string()
			.min(11, 'Telefone deve conter 11 digitos (ex: 41999990000)')
			.max(11, 'Telefone deve conter 11 digitos (ex: 41999990000)')
			.matches(/^[0-9]*$/, 'Telefone deve conter Apenas números!'),
		cpf: yup
			.string()
			.min(11, 'CPF deve conter 11 números, sem pontos ou traços')
			.max(11, 'CPF deve conter 11 números, sem pontos ou traços')
			.matches(/^[0-9]*$/, 'CPF Apenas números!'),
		cep: yup
			.string()
			.min(8, 'CEP deve conter 8 números, sem pontos ou traços')
			.max(8, 'CEP deve conter 8 números, sem pontos ou traços')
			.matches(/^[0-9]*$/, 'CEP Apenas números!'),
		numeroDeResidencia: yup.string(),
		complementoResidencial: yup.string(),
		vendedorId: yup.string(),
		isActive: yup.boolean(),
	})
	.strict()
	.noUnknown();
