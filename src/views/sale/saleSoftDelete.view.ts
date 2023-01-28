import Sale from '../../models/sale.models';
import {AppError} from '../../utils/appError';

//@Descricao inativa a compra (isActive = false)
//@DELETE /api/vendas/:saleId
//@No token
const saleSoftDeleteView = async (saleId: string) => {
	let sale: any = null;

	try {
		sale = await Sale.findById(saleId).lean();
	} catch (error) {
		//Erro caso o ID esteja em um formato incorreto
		throw new AppError(
			'Registro da venda não encontrado, verifique o ID especificado'
		);
	}

	if (!sale) {
		//Erro caso nao exista uma venda com aquele ID
		throw new AppError(
			'Registro da venda não encontrado, verifique o ID especificado'
		);
	}

	if (sale.isActive === false) {
		throw new AppError('Esta compra já encontra-se inativa');
	}

	//Delete
	await Sale.findByIdAndUpdate(saleId, {isActive: false});

	return;
};

export default saleSoftDeleteView;
