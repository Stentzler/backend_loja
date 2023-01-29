import Sale from '../../models/sale.models';
import reportTotalSalesByType from '../../utils/reportTotalSalesByType';

const reportSalesPerTypeView = async () => {
	const salesPerType = await Sale.aggregate([
		{
			$group: {
				_id: {
					pagamento: '$formaDePagamento',
					ano: {$year: '$dataDaCompra'},
					mes: {$month: '$dataDaCompra'},
				},
				totalDeVendas: {$sum: 1},
			},
		},
	]);

	const report = reportTotalSalesByType(salesPerType);

	return report;
};

export default reportSalesPerTypeView;
