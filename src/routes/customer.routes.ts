import {Router} from 'express';
import customerCreateController from '../controllers/costumer/customerCreate.controller';
import customerListController from '../controllers/costumer/customerList.controller';
import customerRetrieveController from '../controllers/costumer/customerRetrieve.controller';
import customerSoftDeleteController from '../controllers/costumer/customerSoftDelete.controller';
import customerUpdateController from '../controllers/costumer/customerUpdate.controller';
import {schemaValidatorMiddleware} from '../middlewares/schemaValidator.middleware';
import {
	customerCreateSchema,
	customerUpdateSchema,
} from '../yupSchemas/customerSchema';

const customerRoutes = Router();

customerRoutes.post(
	'/',
	schemaValidatorMiddleware(customerCreateSchema),
	customerCreateController
);

customerRoutes.get('/', customerListController);
customerRoutes.get('/:customerId', customerRetrieveController);
customerRoutes.delete('/:customerId', customerSoftDeleteController);
customerRoutes.patch(
	'/:customerId',
	schemaValidatorMiddleware(customerUpdateSchema),
	customerUpdateController
);

export default customerRoutes;
