import {Response, Request} from 'express';
import reportByParamsTotalPerTypeView from '../../views/reportByParams/reportByParamsTotalPerType.view';

const reportByParamsTotalPerTypeController = async (
	req: Request,
	res: Response
) => {
	const year = Number(req.params.ano);
	const month = Number(req.params.mes);

	const report = await reportByParamsTotalPerTypeView(year, month);

	res.status(200).send(report);
};

export default reportByParamsTotalPerTypeController;
