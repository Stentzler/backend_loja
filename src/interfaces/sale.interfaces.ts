export interface ISaleRequest {
	valor: number;
	dataDaCompra: Date;
	formaDePagamento: string;
	vendedorId: string;
	clienteId: string;
}

export interface ISaleUpdate {
	valor?: number;
	dataDaCompra?: Date;
	formaDePagamento?: string;
	vendedorId?: string;
	clienteId?: string;
	isActive?: boolean;
}
