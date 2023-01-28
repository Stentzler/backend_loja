import {Router} from 'express';
import {schemaValidatorMiddleware} from '../middlewares/schemaValidator.middleware';
import {
	vendorCreateSchema,
	vendorUpdateSchema,
} from '../yupSchemas/vendorSchema';
import vendorCreateController from '../controllers/vendor/vendorCreate.controller';
import vendorListController from '../controllers/vendor/vendorList.controller';
import vendorRetrieveController from '../controllers/vendor/vendorRetrieve.controller';
import vendorSoftDeleteController from '../controllers/vendor/vendorSoftDelete.controller';
import vendorUpdateController from '../controllers/vendor/vendorUpdate.controller';

const vendorRoutes = Router();

vendorRoutes.post(
	'/',
	schemaValidatorMiddleware(vendorCreateSchema),
	vendorCreateController
);
vendorRoutes.get('/', vendorListController);
vendorRoutes.get('/:vendorId', vendorRetrieveController);
vendorRoutes.delete('/:vendorId', vendorSoftDeleteController);
vendorRoutes.patch(
	'/:vendorId',
	schemaValidatorMiddleware(vendorUpdateSchema),
	vendorUpdateController
);

export default vendorRoutes;
