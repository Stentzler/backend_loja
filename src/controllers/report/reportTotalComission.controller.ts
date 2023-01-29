import {Response, Request} from 'express';
import reportTotalComissionView from '../../views/report/reportTotalComission.view';

const reportTotalComissionController = async (req: Request, res: Response) => {
	const reportResult = await reportTotalComissionView();

	res.status(200).send(reportResult);
};

export default reportTotalComissionController;
