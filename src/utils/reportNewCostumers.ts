const reportNewCostumers = (report: any) => {
	const saleReport: any[] = [];

	//Criando novo objeto
	report.forEach((report: any) => {
		const updatedReport = {
			ano: report._id.ano,
			mes: report._id.mes,
			novosClientes: report.novosClientes,
			dateFormat: new Date(`${report._id.ano}/${report._id.mes}/01`),
		};
		saleReport.push(updatedReport);
	});

	return saleReport
		.sort((a, b) => b.dateFormat - a.dateFormat)
		.map(item => {
			const {dateFormat, ...rest} = item;
			return rest;
		});
};

export default reportNewCostumers;
