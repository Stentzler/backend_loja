import {Response, Request} from 'express';
import reportByParamsNewCostumersView from '../../views/reportByParams/reportByParamsNewCostumers.view';

const reportByParamsNewCostumersController = async (
	req: Request,
	res: Response
) => {
	const year = Number(req.params.ano);
	const month = Number(req.params.mes);

	const report = await reportByParamsNewCostumersView(year, month);

	res.status(200).send(report);
};

export default reportByParamsNewCostumersController;
