import {Router} from 'express';
import saleCreateController from '../controllers/sale/saleCreate.controller';
import saleSoftDeleteController from '../controllers/sale/saleSoftDelete.controller';
import saleListController from '../controllers/sale/saleList.controller';
import saleRetrieveController from '../controllers/sale/saleRetrieve.controller';
import {schemaValidatorMiddleware} from '../middlewares/schemaValidator.middleware';
import {saleCreateSchema, saleUpdateSchema} from '../yupSchemas/saleSchema';
import saleUpdateController from '../controllers/sale/saleUpdate.controller';

const saleRoutes = Router();

saleRoutes.post(
	'/',
	schemaValidatorMiddleware(saleCreateSchema),
	saleCreateController
);

saleRoutes.get('/', saleListController);
saleRoutes.get('/:saleId', saleRetrieveController);
saleRoutes.delete('/:saleId', saleSoftDeleteController);
saleRoutes.patch(
	'/:saleId',
	schemaValidatorMiddleware(saleUpdateSchema),
	saleUpdateController
);

export default saleRoutes;
