import Customer from '../../models/customer.models';
import Sale from '../../models/sale.models';

//@Descricao Lista todos os clientes ATIVOS (isActive: true) em ordem alfabética pelo nome cliente, nome e id do vendedor responsável pelo cliente e a compra mais recente realizada por este cliente(Caso o cliente não tenha efetuado nenhuma compra o valor retornado será null).
//@GET /api/clientes
//@No token
const customerListView = async () => {
	// Pegando nome e id do cliente e do vendedor
	const costumers: any = await Customer.find(
		{isActive: true},
		['nomeCompleto'],
		{
			skip: 0,
			limit: 100,
			sort: {
				nomeCompleto: 'asc',
			},
		}
	)
		.populate('vendedor', 'nomeCompleto')
		.lean();

	//Pegando ultima compra do cliente
	for (const costumer of costumers) {
		const sale = await Sale.find(
			{cliente: costumer._id},
			[
				'valor',
				'dataDaCompra',
				'formaDePagamento',
				'isDelivered',
				'createdAt',
				'updatedAt',
			],
			{
				sort: {
					dataDaCompra: 'desc',
				},
				limit: 1,
			}
		).lean();

		costumer.ultimaCompra = sale[0] ?? null;
	}

	return costumers;
};

export default customerListView;
