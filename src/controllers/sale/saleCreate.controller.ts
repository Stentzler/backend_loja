import {Request, Response} from 'express';
import {ISaleRequest} from '../../interfaces/sale.interfaces';
import saleCreateView from '../../views/sale/saleCreate.view';

const saleCreateController = async (req: Request, res: Response) => {
	const saleDetails: ISaleRequest = req.body;

	const sale = await saleCreateView(saleDetails);

	res.status(201).send(sale);
};

export default saleCreateController;
