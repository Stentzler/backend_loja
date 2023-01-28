import * as yup from 'yup';

//Validação para criação de vendedor
export const vendorCreateSchema = yup
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
			.matches(/^[0-9]*$/, 'telefone Apenas números!')
			.required(),
		cpf: yup
			.string()
			.min(11, 'CPF deve conter 11 números, sem pontos ou traços')
			.max(11, 'CPF deve conter 11 números, sem pontos ou traços')
			.matches(/^[0-9]*$/, ' CPF Apenas números!')
			.required(),
		cep: yup
			.string()
			.min(8, 'CEP deve conter 8 números, sem pontos ou traços')
			.max(8, 'CEP deve conter 8 números, sem pontos ou traços')
			.matches(/^[0-9]*$/, 'cep Apenas números!')
			.required(),
		numeroDeResidencia: yup
			.string()
			.required('numeroDeResidencia deve ser informado'),
		complementoResidencial: yup.string(),
		dataDeContratacao: yup
			.string()
			.matches(
				/^(19|20)\d\d[/](0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])$/,
				'Formato da data deve ser YYYY/MM/DD'
			)
			.required(),
		percentualDeComissao: yup
			.number()
			.min(0, 'Percentual de comissão não pode ser menor do que zero')
			.max(100, 'Percentual de comissão não pode ser maior que cem')
			.required(),
		horarioDeEntrada: yup
			.string()
			.matches(
				/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
				'Formato da hora deve ser HH:MM (HH deve ser de 00 - 23) | (MM deve ser de 00 - 59) | (EX: 01:01)'
			)
			.required(),
		horarioDeSaida: yup
			.string()
			.matches(
				/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
				'Formato da hora deve ser HH:MM (HH deve ser de 00 - 23) | (MM deve ser de 00 - 59) | (EX: 01:01)'
			)
			.required(),
	})
	.strict()
	.noUnknown();

//Validação para update de vendedor
export const vendorUpdateSchema = yup
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
			.matches(/^[0-9]*$/, 'Telefone Apenas números!'),
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
		dataDeContratacao: yup
			.string()
			.matches(
				/^(19|20)\d\d[/](0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])$/,
				'Formato da data deve ser YYYY/MM/DD'
			),
		percentualDeComissao: yup
			.number()
			.min(0, 'Percentual de comissão não pode ser menor do que zero')
			.max(100, 'Percentual de comissão não pode ser maior que cem'),
		horarioDeEntrada: yup
			.string()
			.matches(
				/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
				'Formato da hora deve ser HH:MM (HH deve ser de 00 - 23) | (MM deve ser de 00 - 59) | (EX: 01:01)'
			),
		horarioDeSaida: yup
			.string()
			.matches(
				/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
				'Formato da hora deve ser HH:MM (HH deve ser de 00 - 23) | (MM deve ser de 00 - 59) | (EX: 01:01)'
			),
		isActive: yup.boolean(),
	})
	.strict()
	.noUnknown();
