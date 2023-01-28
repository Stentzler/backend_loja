import Vendor from '../../models/vendor.models';
import compareTime from '../../utils/checkTime';

//@Descricao Lista vendedores ATIVOS(isActive: true) em ordem alfabética e indica se ele está trabalhando no momento do request.
//@GET /api/vendedores
//@No token
const vendorListView = async () => {
	const vendors = await Vendor.find(
		{isActive: true},
		['nomeCompleto', 'horarioDeTrabalho', 'cpf', 'telefone', 'isActive'],
		{
			skip: 0,
			limit: 100,
			sort: {
				nomeCompleto: 'asc',
			},
		}
	).lean();

	//Adicionando Propriedade que indica se o vendedor está trabalhando no momento
	vendors.forEach((vendor: any) => {
		const {horarioDeEntrada, horarioDeSaida} = vendor.horarioDeTrabalho;

		vendor.estaTrabalhando = compareTime(horarioDeEntrada, horarioDeSaida);
	});

	return vendors;
};

export default vendorListView;
