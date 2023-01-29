import {Response, Request} from 'express';
import reportTotalSoldPerMonthView from '../../views/report/reportTotalSoldPerMonth.view';

const reportTotalSoldPerMonthController = async (
	req: Request,
	res: Response
) => {
	const reportResult = await reportTotalSoldPerMonthView();

	res.status(200).send(reportResult);
};

export default reportTotalSoldPerMonthController;
