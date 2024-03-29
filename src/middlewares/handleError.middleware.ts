import {Request, Response, NextFunction} from 'express';
import {AppError} from '../utils/appError';

const handleErrorMiddleware = async (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			message: error.message,
		});
	}
	console.log({name: error.name, message: error.message});
	return res.status(500).json({
		message: 'Internal server error',
	});
};

export {handleErrorMiddleware};
