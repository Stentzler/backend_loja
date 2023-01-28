import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import {connectDb} from './config/db';
import {appRoutes} from './routes';
import {handleErrorMiddleware} from './middlewares/handleError.middleware';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

//Inicializando Database
(async () => {
	await connectDb();

	app.listen(PORT, () => {
		console.log(`Server running PORT:${PORT}`);
	});
})();

//Conectando com as rotas
appRoutes(app);

//Middleware de errors
app.use(handleErrorMiddleware);
