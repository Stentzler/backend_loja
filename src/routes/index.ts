import {Express} from 'express';
import customerRoutes from './customer.routes';
import reportRoutes from './report.routes';
import saleRoutes from './sale.routes';
import vendorRoutes from './vendor.routes';

export const appRoutes = (app: Express) => {
	app.use('/api/vendedores', vendorRoutes);
	app.use('/api/clientes', customerRoutes);
	app.use('/api/vendas', saleRoutes);
	app.use('/api/relatorios', reportRoutes);
};
