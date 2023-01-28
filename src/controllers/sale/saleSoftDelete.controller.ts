import {Request, Response} from 'express';
import saleSoftDeleteView from '../../views/sale/saleSoftDelete.view';

const saleSoftDeleteController = async (req: Request, res: Response) => {
	const saleId: string = req.params.saleId;

	await saleSoftDeleteView(saleId);

	res.status(204).send();
};

export default saleSoftDeleteController;
