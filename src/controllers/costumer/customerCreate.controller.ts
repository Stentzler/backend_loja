import {Request, Response} from 'express';
import {ICustomerRequest} from '../../interfaces/customer.interfaces';
import customerCreateView from '../../views/costumer/customerCreate.view';

const customerCreateController = async (req: Request, res: Response) => {
	const customerDetails: ICustomerRequest = req.body;

	const customer = await customerCreateView(customerDetails);
 
	res.status(201).send(customer);
};

export default customerCreateController;
