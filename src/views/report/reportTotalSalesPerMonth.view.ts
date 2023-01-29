import Sale from '../../models/sale.models';
import reportTotalSalesPerMonth from '../../utils/reportTotalSalesPerMonth';

const reportTotalSalesPerMonthView = async () => {
	const salesPerMonth = await Sale.aggregate([
		{
			$group: {
				_id: {
					ano: {$year: '$dataDaCompra'},
					mes: {$month: '$dataDaCompra'},
				},
				totalDeVendas: {$sum: 1},
			},
		},
	]);

	const report = reportTotalSalesPerMonth(salesPerMonth);

	return report;
};

export default reportTotalSalesPerMonthView;
