import {Request, Response} from 'express';
import vendorListView from '../../views/vendor/vendorList.view';

const vendorListController = async (req: Request, res: Response) => {
	const vendor = await vendorListView();

	res.status(200).send(vendor);
};

export default vendorListController;
