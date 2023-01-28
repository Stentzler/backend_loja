import {Request, Response} from 'express';
import {IVendorRequest} from '../../interfaces/vendor.interfaces';
import vendorCreateView from '../../views/vendor/vendorCreate.view';

const vendorCreateController = async (req: Request, res: Response) => {
	const vendorDetails: IVendorRequest = req.body;

	const vendor = await vendorCreateView(vendorDetails);

	res.status(201).send(vendor);
};

export default vendorCreateController;
