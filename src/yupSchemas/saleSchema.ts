import * as yup from 'yup';

// Regex para verificar se foram passados apenas 2 digitos para centavos
const patternTwoDigitsAfterComma = /^\d+(\.\d{0,2})?$/;

//Validação para criação de vendas
export const saleCreateSchema = yup
	.object()
	.shape({
		valor: yup
			.number()
			.positive('O valor deve ser um número positivo EX:(50.99)')
			.test(
				'isDecimal',
				'O Valor da compra não pode conter mais de dois dígitos para centavos EX:(50.99)',
				(val: any) => {
					if (val != undefined) {
						return patternTwoDigitsAfterComma.test(val);
					}
					return true;
				}
			)
			.required('Valor da compra é um campo obrigatório EX:(50.99)'),
		dataDaCompra: yup
			.string()
			.matches(
				/^(19|20)\d\d[/](0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])$/,
				'Formato da data deve ser YYYY/MM/DD'
			),
		formaDePagamento: yup
			.string()
			.oneOf(['cartao', 'dinheiro', 'pix'])
			.required('Campo formaDePagamento é obrigatório'),
		vendedorId: yup.string().required('O campo vendedorId deve ser informado'),
		clienteId: yup.string().required('O campo clienteId deve ser informado'),
	})
	.strict()
	.noUnknown();

//Validação para update de vendas
export const saleUpdateSchema = yup
	.object()
	.shape({
		valor: yup
			.number()
			.positive('O valor deve ser um número positivo EX:(50.99)')
			.test(
				'isDecimal',
				'O Valor da compra não pode conter mais de dois dígitos para centavos EX:(50.99)',
				(val: any) => {
					if (val != undefined) {
						return patternTwoDigitsAfterComma.test(val);
					}
					return true;
				}
			),
		dataDaCompra: yup
			.string()
			.matches(
				/^(19|20)\d\d[/](0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])$/,
				'Formato da data deve ser YYYY/MM/DD'
			),
		formaDePagamento: yup.string().oneOf(['cartao', 'dinheiro', 'pix']),
		vendedorId: yup.string(),
		clienteId: yup.string(),
		isActive: yup.boolean(),
	})
	.strict()
	.noUnknown();
