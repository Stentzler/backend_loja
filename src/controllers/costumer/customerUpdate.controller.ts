import {Request, Response} from 'express';
import {ICustomerUpdate} from '../../interfaces/customer.interfaces';
import customerUpdateView from '../../views/costumer/customerUpdate.view';

const customerUpdateController = async (req: Request, res: Response) => {
	const customerId: string = req.params.customerId;
	const customerUpdateDetails: ICustomerUpdate = req.body;

	const updatedCustomer = await customerUpdateView(
		customerUpdateDetails,
		customerId
	);

	res.status(200).send(updatedCustomer);
};

export default customerUpdateController;
