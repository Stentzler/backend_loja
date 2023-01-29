import {isConstructorDeclaration} from 'typescript';
import Sale from '../../models/sale.models';
import Vendor from '../../models/vendor.models';

const reportTotalComissionView = async () => {
	const salesPerVendor = await Sale.aggregate([
		{
			$group: {
				_id: {
					vendedor: '$vendedor',
					ano: {$year: '$dataDaCompra'},
					mes: {$month: '$dataDaCompra'},
				},
				valorTotal: {$sum: '$valor'},
			},
		},
	]);

	const saleReport = [];

	//Criando novo objeto e adicionando parametro Date
	for (let sale of salesPerVendor) {
		const vendor = await Vendor.findById(sale._id.vendedor);

		const updatedReport = {
			ano: sale._id.ano,
			mes: sale._id.mes,
			comissaoPaga: (sale.valorTotal / 100) * vendor!.percentualDeComissao,
			dateFormat: new Date(`${sale._id.ano}/${sale._id.mes}/01`),
		};
		saleReport.push(updatedReport);
	}

	//Agrupando valores em um objeto a partir da Data {key(data): value(totalComissao)}
	const groupByDate = [
		saleReport.reduce((group: any, sale: any) => {
			group[sale.dateFormat] =
				(group[sale.dateFormat] || 0) + sale.comissaoPaga;
			return group;
		}, {}),
	];

	//Formatando para array de objetos apartir do Objeto gerado para key=date value=comissao
	const resultComissionPerMonth = [];
	for (const [key, value] of Object.entries(groupByDate[0])) {
		const newObj = {
			ano: new Date(key).getFullYear(),
			mes: new Date(key).getMonth() + 1,
			comissao: Number(value).toFixed(2),
			dateFormat: new Date(key),
		};
		resultComissionPerMonth.push(newObj);
	}

	return resultComissionPerMonth.sort(
		(a, b) => Number(b.dateFormat) - Number(a.dateFormat)
	);
};

export default reportTotalComissionView;
