import Sale from '../../models/sale.models';

//@Descricao Lista todas as compras ordenadas da mais recente para a mais antiga, exibe também o valor da compra e o nome e id do cliente/vendedor.
//@GET /api/vendas
//@No token
const saleListView = async () => {
	const sales = await Sale.find({isActive: true}, ['valor', 'dataDaCompra'], {
		skip: 0,
		limit: 50,
		sort: {
			dataDaCompra: 'desc',
		},
	})
		.populate('cliente', 'nomeCompleto')
		.lean();

	return sales;
};

export default saleListView;
