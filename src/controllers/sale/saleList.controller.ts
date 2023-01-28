import {Request, Response} from 'express';
import saleListView from '../../views/sale/saleList.view';

const saleListController = async (req: Request, res: Response) => {
	const sales = await saleListView();

	res.status(200).send(sales);
};

export default saleListController;
