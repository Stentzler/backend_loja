import {Response, Request} from 'express';
import reportByParamsTotalComissionView from '../../views/reportByParams/reportByParamsTotalComission.view';

const reportByParamsTotalComissionController = async (
	req: Request,
	res: Response
) => {
	const year = Number(req.params.ano);
	const month = Number(req.params.mes);

	const report = await reportByParamsTotalComissionView(year, month);

	res.status(200).send(report);
};

export default reportByParamsTotalComissionController;
