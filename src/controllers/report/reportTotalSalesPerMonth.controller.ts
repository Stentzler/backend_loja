import {Response, Request} from 'express';
import reportTotalSalesPerMonthView from '../../views/report/reportTotalSalesPerMonth.view';

const reportTotalSalesPerMonthController = async (
	req: Request,
	res: Response
) => {
	const reportResult = await reportTotalSalesPerMonthView();

	res.status(200).send(reportResult);
};

export default reportTotalSalesPerMonthController;
