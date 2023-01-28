export interface ICustomerRequest {
	nomeCompleto: string;
	dataDeNascimento: string;
	email: string;
	telefone: string;
	cpf: string;
	cep: string;
	numeroDeResidencia: string;
	complementoResidencial?: string;
	vendedorId: string;
}

export interface ICustomerUpdate {
	nomeCompleto?: string;
	dataDeNascimento?: string;
	email?: string;
	telefone?: string;
	cpf?: string;
	cep?: string;
	numeroDeResidencia?: string;
	complementoResidencial?: string;
	vendedorId?: string;
	isActive?: boolean;
}
