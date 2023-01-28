import axios from 'axios';
import {AppError} from './appError';

const getCep = async (cep: string) => {
	try {
		const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
		if (response.data.erro) {
			//Forcando um erro, pois a API retorna status 200 quando o cep nao é encontrado
			throw new Error();
		}
		return response.data;
	} catch (error: any) {
		throw new AppError(
			'CEP específicado não foi encontrado, por favor verifique seu CEP',
			400
		);
	}
};

export default getCep;
