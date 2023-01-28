import * as mongoose from 'mongoose';

const saleSchema = new mongoose.Schema(
	{
		vendedor: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, 'Informe o vendedor para esta compra'],
			ref: 'Vendor',
		},
		cliente: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, 'Informe o cliente para esta compra'],
			ref: 'Customer',
		},
		valor: {
			type: Number,
			set: (value: Number) => value.toFixed(2),
			required: [true, 'Informe o valor total da compra'],
		},
		dataDaCompra: {
			type: Date, //Formato YYYY/MM/DD
			required: [true, 'data da compra é um campo obrigatório'],
		},
		formaDePagamento: {
			type: String,
			enum: ['cartao', 'dinheiro', 'pix'],
			required: [true, 'Forma de pagamento é um campo obrigatório'],
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

export default mongoose.model('Sale', saleSchema);
