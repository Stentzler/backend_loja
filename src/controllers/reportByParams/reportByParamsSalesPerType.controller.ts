import {Response, Request} from 'express';
import reportByParamsSalesPerTypeView from '../../views/reportByParams/reportByParamsSalesPerType.view';

const reportByParamsSalesPerTypeController = async (
	req: Request,
	res: Response
) => {
	const year = Number(req.params.ano);
	const month = Number(req.params.mes);

	const report = await reportByParamsSalesPerTypeView(year, month);

	res.status(200).send(report);
};

export default reportByParamsSalesPerTypeController;
