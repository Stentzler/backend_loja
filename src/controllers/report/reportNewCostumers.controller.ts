import {Response, Request} from 'express';
import reportNewCostumersView from '../../views/report/reportNewCostumers.view';

const reportNewCostumersController = async (req: Request, res: Response) => {
	const reportResult = await reportNewCostumersView();

	res.status(200).send(reportResult);
};

export default reportNewCostumersController;
