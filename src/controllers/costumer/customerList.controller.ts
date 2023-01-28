import {Request, Response} from 'express';
import customerListView from '../../views/costumer/customerList.view';

const customerListController = async (req: Request, res: Response) => {
	const customers = await customerListView();

	res.status(200).send(customers);
};

export default customerListController;
