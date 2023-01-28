import {Request, Response} from 'express';
import vendorUpdateView from '../../views/vendor/vendorUpdate.view';

const vendorUpdateController = async (req: Request, res: Response) => {
	const vendorId: string = req.params.vendorId;
	const vendorUpdateDetails = req.body;

	const updatedVendor = await vendorUpdateView(vendorUpdateDetails, vendorId);

	res.status(200).send(updatedVendor);
};

export default vendorUpdateController;
