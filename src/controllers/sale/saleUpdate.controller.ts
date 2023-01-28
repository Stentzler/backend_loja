import {Request, Response} from 'express';
import saleUpdateView from '../../views/sale/saleUpdate.view';

const saleUpdateController = async (req: Request, res: Response) => {
	const saleId: string = req.params.saleId;
	const saleUpdateDetails = req.body;

	const updatedSale = await saleUpdateView(saleUpdateDetails, saleId);

	res.status(200).send(updatedSale);
};

export default saleUpdateController;
