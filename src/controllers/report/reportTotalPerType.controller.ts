import {Response, Request} from 'express';
import reportTotalPerTypeView from '../../views/report/reportTotalPerType.view';

const reportTotalPerTypeController = async (req: Request, res: Response) => {
	const reportResult = await reportTotalPerTypeView();

	res.status(200).send(reportResult);
};

export default reportTotalPerTypeController;
