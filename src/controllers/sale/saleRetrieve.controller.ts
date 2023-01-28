import {Request, Response} from 'express';
import saleRetrieveView from '../../views/sale/saleRetrieve.view';

const saleRetrieveController = async (req: Request, res: Response) => {
	const saleId: string = req.params.saleId;

	const saleProfile = await saleRetrieveView(saleId);

	res.status(200).send(saleProfile);
};

export default saleRetrieveController;
