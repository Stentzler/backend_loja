import {Response, Request} from 'express';
import reportSalesPerTypeView from '../../views/report/reportSalesPerType.view';

const reportSalesPerTypeController = async (req: Request, res: Response) => {
	const reportResult = await reportSalesPerTypeView();

	res.status(200).send(reportResult);
};

export default reportSalesPerTypeController;
