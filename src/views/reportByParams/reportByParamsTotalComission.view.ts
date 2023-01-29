import Sale from '../../models/sale.models';
import Vendor from '../../models/vendor.models';
import {AppError} from '../../utils/appError';
import reportTotalComissionPerMonth from '../../utils/reportTotalComissionPerMonth';

const reportByParamsTotalComissionView = async (
	year: number,
	month: number
) => {
	const now = new Date();
	const currentYear = Number(now.getFullYear());

	if (year > currentYear) {
		throw new AppError(`Valor Máximo para ano é ${currentYear}`);
	}

	if (month > 12 || month < 1) {
		throw new AppError('Mês deve ser um número entre 1 e 12');
	}
	const salesPerVendor = await Sale.aggregate([
		{
			$group: {
				_id: {
					vendedor: '$vendedor',
					ano: {$year: '$dataDaCompra'},
					mes: {$month: '$dataDaCompra'},
				},
				valorTotal: {$sum: '$valor'},
			},
		},
	]);

	const resultComissionPerMonth = await reportTotalComissionPerMonth(
		salesPerVendor
	);

	return resultComissionPerMonth.filter(
		item => item.ano === year && item.mes === month
	);
};

export default reportByParamsTotalComissionView;
