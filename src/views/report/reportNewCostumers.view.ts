import Customer from '../../models/customer.models';
import reportNewCostumers from '../../utils/reportNewCostumers';

const reportNewCostumersView = async () => {
	const customersPerMonth = await Customer.aggregate([
		{
			$group: {
				_id: {
					ano: {$year: '$createdAt'},
					mes: {$month: '$createdAt'},
				},
				novosClientes: {$sum: 1},
			},
		},
	]);

	const report = reportNewCostumers(customersPerMonth);

	return report;
};

export default reportNewCostumersView;
