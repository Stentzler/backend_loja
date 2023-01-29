import Sale from '../../models/sale.models';
import reportTotalComissionPerMonth from '../../utils/reportTotalComissionPerMonth';

const reportTotalComissionView = async () => {
	// Pegando vendedor, data e valor total daquele mês
	const salesPerVendor = await Sale.aggregate([
		{
			$group: {
				_id: {
					vendedor: '$vendedor',
					ano: {$year: '$dataDaCompra'},
					mes: {$month: '$dataDaCompra'},
				},
				valorTotal: {$sum: '$valor'}, //MUDAR O TOTAL COMISSION BY TYPE
			},
		},
	]);

	return reportTotalComissionPerMonth(salesPerVendor);
};

export default reportTotalComissionView;
