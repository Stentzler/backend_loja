import Vendor from '../models/vendor.models';

const reportTotalComissionPerMonth = async (report: any) => {
	const saleReport = [];

	//Criando novo objeto Contendo Data e Valor de comissao pago a cada vendedor.
	for (let sale of report) {
		const vendor = await Vendor.findById(sale._id.vendedor);

		const updatedReport = {
			comissaoPaga: (sale.valorTotal / 100) * vendor!.percentualDeComissao,
			dateFormat: new Date(`${sale._id.ano}/${sale._id.mes}/01`),
		};
		saleReport.push(updatedReport);
	}

	//Agrupando valores em um objeto a partir da Data {key(data): value(totalComissao)}
	const groupByDate = [
		saleReport.reduce((obj: any, sale: any) => {
			obj[sale.dateFormat] = (obj[sale.dateFormat] || 0) + sale.comissaoPaga;
			return obj;
		}, {}),
	];

	//Formatando para array de objetos apartir do Objeto gerado para key=date value=Totalcomissao
	const resultComissionPerMonth = [];
	for (const [key, value] of Object.entries(groupByDate[0])) {
		const newObj = {
			ano: new Date(key).getFullYear(),
			mes: new Date(key).getMonth() + 1,
			comissaoPaga: Number(value).toFixed(2),
			dateFormat: new Date(key),
		};
		resultComissionPerMonth.push(newObj);
	}

	return resultComissionPerMonth.sort(
		(a, b) => Number(b.dateFormat) - Number(a.dateFormat)
	);
};

export default reportTotalComissionPerMonth;
