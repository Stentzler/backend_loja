import {Request, Response} from 'express';
import customerRetrieveView from '../../views/costumer/customerRetrieve.view';

const customerRetrieveController = async (req: Request, res: Response) => {
	const customerId: string = req.params.customerId;

	const customerProfile = await customerRetrieveView(customerId);

	res.status(200).send(customerProfile);
};

export default customerRetrieveController;
