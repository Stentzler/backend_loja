import {Request, Response} from 'express';
import vendorRetrieveView from '../../views/vendor/vendorRetrieve.view';

const vendorRetrieveController = async (req: Request, res: Response) => {
	const vendorId: string = req.params.vendorId;

	const vendorProfile = await vendorRetrieveView(vendorId);

	res.status(200).send(vendorProfile);
};

export default vendorRetrieveController;
