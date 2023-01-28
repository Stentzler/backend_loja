import {Request, Response} from 'express';
import vendorSoftDeleteView from '../../views/vendor/vendorSoftDelete.view';

const vendorSoftDeleteController = async (req: Request, res: Response) => {
	const vendorId: string = req.params.vendorId;

	await vendorSoftDeleteView(vendorId);

	res.status(204).send();
};

export default vendorSoftDeleteController;
