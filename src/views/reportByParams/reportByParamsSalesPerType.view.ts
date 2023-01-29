import Sale from '../../models/sale.models';
import {AppError} from '../../utils/appError';
import reportTotalSalesByType from '../../utils/reportTotalSalesByType';

const reportByParamsSalesPerTypeView = async (year: number, month: number) => {
	const now = new Date();
	const currentYear = Number(now.getFullYear());

	if (year > currentYear) {
		throw new AppError(`Valor Máximo para ano é ${currentYear}`);
	}

	if (month > 12 || month < 1) {
		throw new AppError('Mês deve ser um número entre 1 e 12');
	}

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

	const reports = reportTotalSalesByType(salesPerType);

	const filteredReport = reports.filter(
		report => report.ano === year && report.mes === month
	);

	return filteredReport;
};

export default reportByParamsSalesPerTypeView;
