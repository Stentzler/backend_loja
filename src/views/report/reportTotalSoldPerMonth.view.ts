import Sale from '../../models/sale.models';
import reportTotalSoldPerMonth from '../../utils/reportTotalSoldPerMonth';

const reportTotalSoldPerMonthView = async () => {
	const salesPerMonth = await Sale.aggregate([
		{
			$group: {
				_id: {
					ano: {$year: '$dataDaCompra'},
					mes: {$month: '$dataDaCompra'},
				},
				totalVendido: {$sum: '$valor'},
			},
		},
	]);

	const report = reportTotalSoldPerMonth(salesPerMonth);

	return report;
};

export default reportTotalSoldPerMonthView;
