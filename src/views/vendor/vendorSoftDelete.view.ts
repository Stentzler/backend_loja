import Vendor from '../../models/vendor.models';
import {AppError} from '../../utils/appError';

//@Descricao inativa o vendedor (isActive = false)
//@DELETE /api/clientes/:clienteId
//@No token
const vendorSoftDeleteView = async (vendorId: string) => {
	let vendor: any = null;

	try {
		vendor = await Vendor.findById(vendorId).lean();
	} catch (error) {
		//Erro caso o ID esteja em um formato incorreto
		throw new AppError('Vendedor não encontrado, verifique o ID especificado');
	}

	if (!vendor) {
		//Erro caso nao exista vendedor com aquele ID
		throw new AppError('Vendedor não encontrado, verifique o ID especificado');
	}

	if (vendor.isActive === false) {
		throw new AppError('Este vendedor já encontra-se inativo');
	}

	//Soft Delete
	await Vendor.findByIdAndUpdate(vendorId, {isActive: false});

	return;
};

export default vendorSoftDeleteView;
