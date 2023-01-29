import {Router} from 'express';
import reportNewCostumersController from '../controllers/report/reportNewCostumers.controller';
import reportSalesPerTypeController from '../controllers/report/reportSalesPerType.controller';
import reportTotalComissionController from '../controllers/report/reportTotalComission.controller';
import reportTotalPerTypeController from '../controllers/report/reportTotalPerType.controller';
import reportTotalSalesPerMonthController from '../controllers/report/reportTotalSalesPerMonth.controller';
import reportTotalSoldPerMonthController from '../controllers/report/reportTotalSoldPerMonth.controller';
import reportByParamsNewCostumersController from '../controllers/reportByParams/reportByParamsNewCostumers.controller';
import reportByParamsSalesPerTypeController from '../controllers/reportByParams/reportByParamsSalesPerType.controller';
import reportByParamsTotalComissionController from '../controllers/reportByParams/reportByParamsTotalComission.controller';
import reportByParamsTotalPerTypeController from '../controllers/reportByParams/reportByParamsTotalPerType.controller';
import reportByParamsTotalSalesPerMonthController from '../controllers/reportByParams/reportByParamsTotalSalesPerMonth.controller';
import reportByParamsTotalSoldPerMonthController from '../controllers/reportByParams/reportByParamsTotalSoldPerMonth.controller';

const reportRoutes = Router();

//Quantidade de vendas por forma de pagamento
reportRoutes.get('/vendas-por-tipo', reportSalesPerTypeController);

//Valor total por forma de pagamento
reportRoutes.get('/valor-total-por-tipo', reportTotalPerTypeController);

//Total de vendas independente da forma
reportRoutes.get('/total-vendas', reportTotalSalesPerMonthController);

//Valor total de vendas independente da forma
reportRoutes.get('/valor-total', reportTotalSoldPerMonthController);

//Total da comissão paga para vendedores naquele mes
reportRoutes.get('/valor-total-comissao', reportTotalComissionController);

//Novos clientes naquele Mês
reportRoutes.get('/novos-clientes', reportNewCostumersController);

//Rotas aceitando Params ANO/MES-------------------
//Novos clientes naquele Mês
reportRoutes.get(
	'/novos-clientes/:ano/:mes',
	reportByParamsNewCostumersController
);

//Quantidade de vendas por forma de pagamento
reportRoutes.get(
	'/vendas-por-tipo/:ano/:mes',
	reportByParamsSalesPerTypeController
);

//Valor total por forma de pagamento
reportRoutes.get(
	'/valor-total-por-tipo/:ano/:mes',
	reportByParamsTotalPerTypeController
);

//Numero total de vendas independente da forma
reportRoutes.get(
	'/total-vendas/:ano/:mes',
	reportByParamsTotalSalesPerMonthController
);

//Valor total de vendas independente da forma
reportRoutes.get(
	'/valor-total/:ano/:mes',
	reportByParamsTotalSoldPerMonthController
);

//Total da comissão paga para vendedores naquele mes
reportRoutes.get(
	'/valor-total-comissao/:ano/:mes',
	reportByParamsTotalComissionController
);
export default reportRoutes;
