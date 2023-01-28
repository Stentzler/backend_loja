const reportSales = (report: any, comission: number) => {
	const saleReport: any[] = [];

	//Criando novo objeto
	report.forEach((report: any) => {
		const updatedReport = {
			ano: report._id.ano,
			mes: report._id.mes,
			totalDeVendas: report.totalDeVendas,
			valorTotalVendido: report.valorTotal,
			comissao: ((report.valorTotal / 100) * comission).toFixed(2),
			dateFormat: new Date(`${report._id.ano}/${report._id.mes}/01`),
		};
		saleReport.push(updatedReport);
	});

	return saleReport.sort((a, b) => b.dateFormat - a.dateFormat);
};

export default reportSales;
