import {Response, Request} from 'express';
import reportByParamsTotalSalesPerMonthView from '../../views/reportByParams/reportByParamsTotalSalesPerMonth.view';

const reportByParamsTotalSalesPerMonthController = async (
	req: Request,
	res: Response
) => {
	const year = Number(req.params.ano);
	const month = Number(req.params.mes);

	const report = await reportByParamsTotalSalesPerMonthView(year, month);

	res.status(200).send(report);
};

export default reportByParamsTotalSalesPerMonthController;
