import {Request, Response} from 'express';
import customerSoftDeleteView from '../../views/costumer/customerSoftDelete.view';

const customerSoftDeleteController = async (req: Request, res: Response) => {
	const customerId: string = req.params.customerId;

	await customerSoftDeleteView(customerId);

	res.status(204).send();
};

export default customerSoftDeleteController;
