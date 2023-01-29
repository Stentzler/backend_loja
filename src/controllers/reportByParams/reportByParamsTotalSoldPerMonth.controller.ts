import {Response, Request} from 'express';
import reportByParamsTotalSalesPerMonthView from '../../views/reportByParams/reportByParamsTotalSalesPerMonth.view';
import reportByParamsTotalSoldPerMonthView from '../../views/reportByParams/reportByParamsTotalSoldPerMonth.view';

const reportByParamsTotalSoldPerMonthController = async (
	req: Request,
	res: Response
) => {
	const year = Number(req.params.ano);
	const month = Number(req.params.mes);

	const report = await reportByParamsTotalSoldPerMonthView(year, month);

	res.status(200).send(report);
};

export default reportByParamsTotalSoldPerMonthController;
