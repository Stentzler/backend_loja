import Sale from '../../models/sale.models';
import reportTotalValueByType from '../../utils/reportTotalValueByType';

const reportTotalPerTypeView = async () => {
	const salesPerType = await Sale.aggregate([
		{
			$group: {
				_id: {
					pagamento: '$formaDePagamento',
					ano: {$year: '$dataDaCompra'},
					mes: {$month: '$dataDaCompra'},
				},
				totalVendido: {$sum: '$valor'},
			},
		},
	]);

	const report = reportTotalValueByType(salesPerType);

	return report;
};

export default reportTotalPerTypeView;
