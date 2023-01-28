import {Request, Response, NextFunction} from 'express';
import {AnySchema} from 'yup';
import {AppError} from '../utils/appError';

const schemaValidatorMiddleware =
	(schema: AnySchema) =>
	async (request: Request, response: Response, next: NextFunction) => {
		try {
			const data = request.body;
			const validatedDate = await schema.validate(data);
			request.body = validatedDate;
			next();
		} catch (error: any) {
			throw new AppError(error.message, 400);
		}
	};
export {schemaValidatorMiddleware};
