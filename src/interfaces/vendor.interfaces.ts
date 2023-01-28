export interface IVendorRequest {
	nomeCompleto: string;
	dataDeNascimento: string;
	email: string;
	telefone: string;
	cpf: string;
	cep: string;
	dataDeContratacao: string;
	percentualDeComissao: number;
	horarioDeEntrada: string;
	horarioDeSaida: string;
	numeroDeResidencia: string;
	complementoResidencial?: string;
}

export interface IVendorUpdate {
	nomeCompleto?: string;
	dataDeNascimento?: string;
	email?: string;
	telefone?: string;
	cpf?: string;
	cep?: string;
	dataDeContratacao?: string;
	percentualDeComissao?: number;
	horarioDeEntrada?: string;
	horarioDeSaida?: string;
	numeroDeResidencia?: string;
	complementoResidencial?: string;
	isActive?: boolean;
}

export interface ICepRequest {
	cep: string | undefined;
	logradouro: string | undefined;
	complemento: string | undefined;
	bairro: string | undefined;
	localidade: string | undefined;
	uf: string | undefined;
	ibge: string | undefined;
	gia: string | undefined;
	ddd: string | undefined;
	siafi: string | undefined;
	numero?: string | undefined;
}
