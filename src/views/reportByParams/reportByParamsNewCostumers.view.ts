import Customer from '../../models/customer.models';
import {AppError} from '../../utils/appError';
import reportNewCostumers from '../../utils/reportNewCostumers';

const reportByParamsNewCostumersView = async (year: number, month: number) => {
	const now = new Date();
	const currentYear = Number(now.getFullYear());

	if (year > currentYear) {
		throw new AppError(`Valor Máximo para ano é ${currentYear}`);
	}

	if (month > 12 || month < 1) {
		throw new AppError('Mês deve ser um número entre 1 e 12');
	}

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

	const reports = reportNewCostumers(customersPerMonth);

	const filteredReport = reports.filter(
		report => report.ano === year && report.mes === month
	);

	return filteredReport;
};

export default reportByParamsNewCostumersView;
