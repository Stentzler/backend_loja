# API Endpoints

**BASE_URL: Not deployed, default settings localhost:3001**

## 1 - Rotas para Vendedor

### 1.1 - Create Vendedor

- Descricao: Cria um novo vendedor
- `POST /api/vendedores`
- Rota publica
- Exemplo de body esperado:

```json
{
	"nomeCompleto": "Vendedor",
	"email": "vendedor@mail.com",
	"cpf": "12345678900",
	"cep": "81110000",
	"dataDeNascimento": "1999/12/12",
	"telefone": "41999990000",
	"dataDeContratacao": "2022/02/12",
	"percentualDeComissao": 3.5,
	"horarioDeEntrada": "08:15",
	"horarioDeSaida": "17:30",
	"numeroDeResidencia": "53B",
	"complementoResidencial": "apt 1503"
}
```

- Exemplo de retorno 201:
  ```json
  {
  	"nomeCompleto": "VENDEDOR",
  	"dataDeNascimento": "1999-12-12T02:00:00.000Z",
  	"email": "vendedor@mail.com",
  	"telefone": "41999990000",
  	"cpf": "12345678900",
  	"endereco": {
  		"cep": "81110-000",
  		"logradouro": "Rua Amarela",
  		"complemento": "apt 1503",
  		"bairro": "Guanabara",
  		"localidade": "Antonio Carlos",
  		"uf": "RS",
  		"ibge": "4106902",
  		"gia": "",
  		"ddd": "54",
  		"siafi": "7535",
  		"numero": "123A"
  	},
  	"dataDeContratacao": "2022-12-12T03:00:00.000Z",
  	"percentualDeComissao": 5.333,
  	"horarioDeTrabalho": {
  		"horarioDeEntrada": "08:59",
  		"horarioDeSaida": "17:15"
  	},
  	"isActive": true,
  	"_id": "63d73e28572376b201006c4f",
  	"createdAt": "2023-01-30T03:48:56.649Z",
  	"updatedAt": "2023-01-30T03:48:56.649Z",
  	"__v": 0
  }
  ```

### 1.2 - List Todos Vendedores

- Descricao: Lista vendedores ATIVOS(isActive: true) em ordem alfabética e
  indica se o vendedor está trabalhando no momento do request.
- `GET /api/vendedores/`
- Rota publica
- Sem body

- Exemplo de retorno 200:
  ```json
  {
  	"_id": "63d5a66160d597499f6c605d",
  	"nomeCompleto": "VENDEDOR",
  	"telefone": "41999990000",
  	"cpf": "12345678901",
  	"horarioDeTrabalho": {
  		"horarioDeEntrada": "08:46",
  		"horarioDeSaida": "17:15"
  	},
  	"isActive": true,
  	"estaTrabalhando": false
  }
  ```

### 1.3 - Get Vendedor Profile

- Descricao Traz as informações de um único vendedor especificado pelo ID;
  resumo das vendas mensais (quantidade de vendas, valor total das vendas e
  comissão recebida por este vendedor) ordenadas pelo mês/ano do mais recente
  para o mais antigo
- `GET /api/vendedores/:vendorId`
- Rota publica
- Sem body

- Exemplo de retorno 200:
  ```json
  {
  	"_id": "63d5a66160d597499f6c605d",
  	"nomeCompleto": "VENDEDOR",
  	"dataDeNascimento": "1999-12-12T02:00:00.000Z",
  	"email": "vendedor@mail.com",
  	"telefone": "41999990000",
  	"cpf": "12345678901",
  	"endereco": {
  		"cep": "81110-522",
  		"logradouro": "Rua Amarela",
  		"complemento": "apt83",
  		"bairro": "Bairro",
  		"localidade": "Cidade",
  		"uf": "PR",
  		"ibge": "4106902",
  		"gia": "",
  		"ddd": "41",
  		"siafi": "7535",
  		"numero": "1223"
  	},
  	"dataDeContratacao": "2022-12-12T03:00:00.000Z",
  	"percentualDeComissao": 5.333,
  	"horarioDeTrabalho": {
  		"horarioDeEntrada": "08:46",
  		"horarioDeSaida": "17:15"
  	},
  	"isActive": true,
  	"createdAt": "2023-01-28T22:49:05.258Z",
  	"updatedAt": "2023-01-28T22:49:05.258Z",
  	"__v": 0,
  	"relatorioDeVendasMensais": [
  		{
  			"ano": 2023,
  			"mes": 1,
  			"totalDeVendas": 1,
  			"valorTotalVendido": 323.22,
  			"comissao": "17.24"
  		},
  		{
  			"ano": 2022,
  			"mes": 12,
  			"totalDeVendas": 2,
  			"valorTotalVendido": 3445.21,
  			"comissao": "183.73"
  		}
  	]
  }
  ```

### 1.4 - Update Vendedor

- Descrição: atualiza dados pelo ID de um determinado vendedor
- `PATCH /api/vendedores/:vendorId`
- Rota publica
- Exemplo de body com todos os fields aceitos:

```json
{
	"nomeCompleto": "Patched",
	"email": "patched@mail.com",
	"cpf": "12345678880",
	"cep": "89400000",
	"dataDeNascimento": "2011/12/31",
	"telefone": "41000000008",
	"dataDeContratacao": "2023/01/02",
	"percentualDeComissao": 13,
	"horarioDeEntrada": "06:20",
	"horarioDeSaida": "15:15",
	"numeroDeResidencia": "123c",
	"complementoResidencial": "",
	"isActive": true
}
```

- Exemplo de retorno 200:
  ```json
  {
  	"endereco": {
  		"cep": "89400-000",
  		"logradouro": "",
  		"complemento": "",
  		"bairro": "",
  		"localidade": "Porto União",
  		"uf": "SC",
  		"ibge": "4213609",
  		"gia": "",
  		"ddd": "42",
  		"siafi": "8267",
  		"numero": "123c"
  	},
  	"horarioDeTrabalho": {
  		"horarioDeEntrada": "06:20",
  		"horarioDeSaida": "15:15"
  	},
  	"_id": "63d73e28572376b201006c4f",
  	"nomeCompleto": "PATCHED",
  	"dataDeNascimento": "2011-12-31T02:00:00.000Z",
  	"email": "patched@mail.com",
  	"telefone": "41000000008",
  	"cpf": "12345678880",
  	"dataDeContratacao": "2023-01-02T03:00:00.000Z",
  	"percentualDeComissao": 13,
  	"isActive": true,
  	"createdAt": "2023-01-30T03:48:56.649Z",
  	"updatedAt": "2023-01-30T04:03:46.904Z",
  	"__v": 0
  }
  ```

### 1.5 - Soft Delete Vendedor

- Descrição: Torna o status do vendedor inativo (isActive=false)
- `DELETE /api/vendedores/:vendorId`
- Sem body
- Retorno: 204

## 2 - Rotas para Clientes

### 2.1 - Create Cliente

- Descricao: Registra um novo Cliente
- `POST /api/clientes`
- Rota publica
- Exemplo de body esperado:

```json
{
	"nomeCompleto": "Cliente",
	"email": "cliente@mail.com",
	"cpf": "12345670000",
	"cep": "89400000",
	"dataDeNascimento": "1992/12/12",
	"telefone": "41999990000",
	"numeroDeResidencia": "123A",
	"complementoResidencial": "apt141",
	"vendedorId": "63d5a66160d597499f6c605d"
}
```

- Exemplo de retorno 201:
  ```json
  {
  	"nomeCompleto": "CLIENTE",
  	"dataDeNascimento": "1992-12-12T02:00:00.000Z",
  	"email": "cliente@mail.com",
  	"telefone": "41999990000",
  	"cpf": "12345670000",
  	"endereco": {
  		"cep": "81110-522",
  		"logradouro": "Rua",
  		"complemento": "apt 1503",
  		"bairro": "Bairro",
  		"localidade": "Curitiba",
  		"uf": "PR",
  		"ibge": "4106902",
  		"gia": "",
  		"ddd": "41",
  		"siafi": "7535",
  		"numero": "123A"
  	},
  	"isActive": true,
  	"vendedor": "63d5a66160d597499f6c605d",
  	"_id": "63d5e36fcba77d2f0fec8c02",
  	"createdAt": "2023-01-29T03:09:35.308Z",
  	"updatedAt": "2023-01-29T03:09:35.308Z",
  	"__v": 0
  }
  ```

### 2.2 - List Todos Clientes

- Descrição: Lista todos os clientes ATIVOS (isActive: true), em ordem
  alfabética pelo nome cliente, nome e id do vendedor responsável pelo cliente e
  a compra mais recente realizada por este cliente (Caso o cliente não tenha
  efetuado nenhuma compra o valor retornado será null).
- `GET /api/clientes`
- Rota publica
- Sem body

- Exemplo de retorno 200:
  ```json
  [
  	{
  		"_id": "63d5a87960d597499f6c606e",
  		"nomeCompleto": "CLIENTE",
  		"vendedor": {
  			"_id": "63d5a66160d597499f6c605d",
  			"nomeCompleto": "VENDEDOR"
  		},
  		"ultimaCompra": {
  			"_id": "63d5a91660d597499f6c607a",
  			"valor": 323.22,
  			"dataDaCompra": "2023-01-02T03:00:00.000Z",
  			"formaDePagamento": "pix",
  			"createdAt": "2023-01-28T23:00:38.168Z",
  			"updatedAt": "2023-01-28T23:20:41.146Z"
  		}
  	}
  ]
  ```

### 2.3 - Get Cliente Profile

- Descrição: Traz as informações de um único cliente especificado pelo ID, Nome
  e ID do vendedor responsável por este cliente e todas as compras relacionadas
  à este cliente.
- `GET /api/clientes/:clienteId`
- Rota publica
- Sem body

- Exemplo de retorno 200:
  ```json
  {
  	"_id": "63d426e403d644cf97685a27",
  	"nomeCompleto": "CLIENTE",
  	"dataDeNascimento": "1992-12-12T02:00:00.000Z",
  	"email": "cliente@mail.com",
  	"telefone": "41999990000",
  	"cpf": "12345678902",
  	"endereco": {
  		"cep": "81110-522",
  		"logradouro": "Rua ",
  		"complemento": "apt141",
  		"bairro": "Bairro",
  		"localidade": "Curitiba",
  		"uf": "PR",
  		"ibge": "4106902",
  		"gia": "",
  		"ddd": "41",
  		"siafi": "7535",
  		"numero": "123A"
  	},
  	"isActive": true,
  	"vendedor": {
  		"_id": "63d426c803d644cf97685a1f",
  		"nomeCompleto": "VENDEDOR1"
  	},
  	"createdAt": "2023-01-27T19:32:52.650Z",
  	"updatedAt": "2023-01-28T04:10:14.072Z",
  	"__v": 0,
  	"registroDeCompras": [
  		{
  			"_id": "63d48309a11d7af02fd9326e",
  			"vendedor": "63d426c803d644cf97685a1f",
  			"cliente": "63d426e403d644cf97685a27",
  			"valor": 111.99,
  			"dataDaCompra": "2021-01-15T03:00:00.000Z",
  			"formaDePagamento": "pix",
  			"isDelivered": false,
  			"createdAt": "2023-01-28T02:06:01.767Z",
  			"updatedAt": "2023-01-28T02:06:01.767Z",
  			"__v": 0
  		}
  	]
  }
  ```

### 2.4 - Update Cliente

- Descrição: atualiza dados pelo ID de um determinado cliente
- `PATCH /api/clientes/:clienteId`
- Rota publica
- Exemplo de body com todos os fields aceitos nesta rota:

```json
{
	"nomeCompleto": "PATCH",
	"email": "patched@mail.com",
	"cpf": "12345675992",
	"cep": "89400000",
	"dataDeNascimento": "1999/12/12",
	"telefone": "41999990009",
	"numeroDeResidencia": "99A",
	"complementoResidencial": "patch",
	"vendedorId": "63d4622a0b574ae9663345bf",
	"isActive": true
}
```

- Exemplo de retorno 200:
  ```json
  {
  	"endereco": {
  		"cep": "89400-000",
  		"logradouro": "Rua",
  		"complemento": "path",
  		"bairro": "Bairro",
  		"localidade": "Curitiba",
  		"uf": "PR",
  		"ibge": "4106902",
  		"gia": "",
  		"ddd": "41",
  		"siafi": "7535",
  		"numero": "99A"
  	},
  	"_id": "63d426e403d644cf97685a27",
  	"nomeCompleto": "PATCH",
  	"dataDeNascimento": "1999-12-12T02:00:00.000Z",
  	"email": "patched@mail.com",
  	"telefone": "41999990009",
  	"cpf": "12345675992",
  	"isActive": true,
  	"vendedor": "63d4622a0b574ae9663345bf",
  	"createdAt": "2023-01-27T19:32:52.650Z",
  	"updatedAt": "2023-01-28T22:06:44.083Z",
  	"__v": 0
  }
  ```

### 2.5 - Soft Delete Cliente

- Descrição: Torna o status do cliente inativo (isActive=false)
- `DELETE /api/clientes/:clienteId`
- Sem body
- Retorno: 204

## 3 - Rotas para Vendas

### 3.1 - Create Venda

- Descricao: Registra um novo Venda
- `POST /api/vendas`
- Rota publica
- Exemplo de body esperado:

```json
{
	"valor": 2.99,
	"dataDaCompra": "2023/01/15",
	"formaDePagamento": "pix",
	"vendedorId": "63d5a66160d597499f6c605d",
	"clienteId": "63d5e36fcba77d2f0fec8c02"
}
```

- Exemplo de retorno 201:
  ```json
  {
  	"vendedor": "63d5a66160d597499f6c605d",
  	"cliente": "63d5e36fcba77d2f0fec8c02",
  	"valor": 2.99,
  	"dataDaCompra": "2023-01-15T03:00:00.000Z",
  	"formaDePagamento": "pix",
  	"isActive": true,
  	"_id": "63d6a8b5a69a88a554b831be",
  	"createdAt": "2023-01-29T17:11:17.244Z",
  	"updatedAt": "2023-01-29T17:11:17.244Z",
  	"__v": 0
  }
  ```

### 3.2 - List Todoa Compras

- Descrição Lista todas as compras ordenadas da mais recente para a mais antiga,
  exibe também o valor da compra e o nome e id do cliente.
- `GET /api/vendas`
- Rota publica
- Sem body

- Exemplo de retorno 200:
  ```json
  [
  	{
  		"_id": "63d5a8b360d597499f6c6072",
  		"cliente": {
  			"_id": "63d5a87960d597499f6c606e",
  			"nomeCompleto": "CLIENTE"
  		},
  		"valor": 111.99,
  		"dataDaCompra": "2022-12-15T03:00:00.000Z"
  	}
  ]
  ```

### 3.3 - Get Cliente Profile

- Descrição rota traz todos os dados da venda especificada, todos os dados do
  cliente que fez a compra e o nome do vendedor responsável pela venda.
- `GET /api/vendas/:vendaId`
- Rota publica
- Sem body

- Exemplo de retorno 200:
  ```json
  {
  	"_id": "63d4275303d644cf97685a2f",
  	"vendedor": {
  		"_id": "63d426c803d644cf97685a1f",
  		"nomeCompleto": "VENDEDOR"
  	},
  	"cliente": {
  		"_id": "63d426e403d644cf97685a27",
  		"nomeCompleto": "CLIENTE",
  		"dataDeNascimento": "1992-12-12T02:00:00.000Z",
  		"email": "cliente@mail.com",
  		"telefone": "41999990000",
  		"cpf": "12345678900",
  		"endereco": {
  			"cep": "89400-000",
  			"logradouro": "Rua",
  			"complemento": "apt-141",
  			"bairro": "Bairro",
  			"localidade": "Curitiba",
  			"uf": "PR",
  			"ibge": "4106902",
  			"gia": "",
  			"ddd": "41",
  			"siafi": "7535",
  			"numero": "123A"
  		},
  		"isActive": true,
  		"vendedor": "63d426c803d644cf97685a1f",
  		"createdAt": "2023-01-27T19:32:52.650Z",
  		"updatedAt": "2023-01-27T19:32:52.650Z",
  		"__v": 0
  	},
  	"valor": 999.99,
  	"dataDaCompra": "2022-12-01T03:00:00.000Z",
  	"formaDePagamento": "pix",
  	"isDelivered": false,
  	"createdAt": "2023-01-27T19:34:43.961Z",
  	"updatedAt": "2023-01-27T19:34:43.961Z",
  	"__v": 0
  }
  ```

### 3.4 - Update Venda

- Descrição: atualiza dados pelo ID de uma determinada venda
- `PATCH /api/vendas/:vendaId`
- Rota publica
- Exemplo de body com todos os fields aceitos nesta rota:

```json
{
	"valor": 2000.15,
	"dataDaCompra": "2021/01/15",
	"formaDePagamento": "pix",
	"vendedorId": "63d426c803d644cf97685a1f",
	"clienteId": "63d426e403d644cf97685a27"
}
```

- Exemplo de retorno 200:
  ```json
  {
  	"isActive": true,
  	"_id": "63d4275303d644cf97685a2f",
  	"vendedor": "63d426c803d644cf97685a1f",
  	"cliente": "63d426e403d644cf97685a27",
  	"valor": 2000.15,
  	"dataDaCompra": "2021-01-15T03:00:00.000Z",
  	"formaDePagamento": "pix",
  	"isDelivered": false,
  	"createdAt": "2023-01-27T19:34:43.961Z",
  	"updatedAt": "2023-01-28T22:30:15.409Z",
  	"__v": 0
  }
  ```

### 3.5 - Soft Delete Venda

- Descrição: Torna o status da venda inativo (isActive=false)
- `DELETE /api/vendas/:vendaId`
- Sem body
- Retorno: 204

## 4 - Rotas De Relatórios

### 4.1 - Total de vendas por tipo

- Descrição: Retorna o relatório contendo quantidade de vendas por forma de
  pagamento para cada mês. Também é possível retornar apenas o relatório de um
  unico mês passando os paramentros ano e mês.
- `GET /api/relatorios/vendas-por-tipo`
- `GET /api/relatorios/vendas-por-tipo/{ANO}/{MES}`
- Rota publica
- Sem body.

- Exemplo de retorno 200:

```json
[
	{
		"ano": 2022,
		"mes": 12,
		"formaDePagamento": "pix",
		"totalDeVendas": 5
	},
	{
		"ano": 2022,
		"mes": 11,
		"formaDePagamento": "dinheiro",
		"totalDeVendas": 1
	}
]
```

### 4.2 - Total de Total vendido por tipo

- Descrição: Retorna o relatório contendo o valor total das vendas por forma de
  pagamento para cada mês. Também é possível retornar apenas o relatório de um
  unico mês passando os paramentros ano e mês.
- `GET /api/relatorios/valor-total-por-tipo`
- `GET /api/relatorios/valor-total-por-tipo/{ANO}/{MES}`
- Rota publica
- Sem body.

- Exemplo de retorno 200:

```json
[
	{
		"ano": 2022,
		"mes": 11,
		"formaDePagamento": "cartao",
		"totalVendido": "371.97"
	},
	{
		"ano": 2022,
		"mes": 11,
		"formaDePagamento": "pix",
		"totalVendido": "247.98"
	}
]
```

### 4.3 - Número total de vendas no mês

- Descrição: Retorna o relatório contendo o número total de vendas independente
  da forma de pagamento para cada mês. Também é possível retornar apenas o
  relatório de um unico mês passando os paramentros ano e mês.
- `GET /api/relatorios/total-vendas`
- `GET /api/relatorios/total-vendas/{ANO}/{MES}`
- Rota publica
- Sem body.

- Exemplo de retorno 200:

```json
[
	{
		"ano": 2022,
		"mes": 12,
		"totalDeVendas": 5
	},
	{
		"ano": 2022,
		"mes": 11,
		"totalDeVendas": 6
	}
]
```

### 4.4 - Valor total das vendas no mês

- Descrição: Retorna o relatório contendo o valor total das vendas independente
  da forma de pagamento para cada mês. Também é possível retornar apenas o
  relatório de um único mês passando os paramentros ano e mês.
- `GET /api/relatorios/valor-total`
- `GET /api/relatorios/valor-total/{ANO}/{MES}`
- Rota publica
- Sem body.

- Exemplo de retorno 200:

```json
[
	{
		"ano": 2022,
		"mes": 12,
		"totalVendido": "3781.18"
	},
	{
		"ano": 2022,
		"mes": 11,
		"totalVendido": "743.94"
	}
]
```

### 4.5 - Valor total de comissão pago

- Descrição: Retorna o relatório contendo o valor total de comissão pago aos
  vendedores em cada mês. Também é possível retornar apenas o relatório de um
  único mês passando os paramentros ano e mês.
- `GET /api/relatorios/valor-total-comissao`
- `GET /api/relatorios/valor-total-comissao/{ANO}/{MES}`
- Rota publica
- Sem body.

- Exemplo de retorno 200:

```json
[
	{
		"ano": 2022,
		"mes": 12,
		"comissaoPaga": "195.49"
	},
	{
		"ano": 2022,
		"mes": 11,
		"comissaoPaga": "26.04"
	}
]
```

### 4.6 - Total de novos clientes registrados

- Descrição: Retorna o relatório contendo o total de novos clientes registrados
  em cada mês. Também é possível retornar apenas o relatório de um único mês
  passando os paramentros ano e mês.
- `GET /api/relatorios/valor-total-comissao`
- `GET /api/relatorios/valor-total-comissao/{ANO}/{MES}`
- Rota publica
- Sem body.

- Exemplo de retorno 200:

```json
[
	{
		"ano": 2023,
		"mes": 1,
		"novosClientes": 2
	},
	{
		"ano": 2022,
		"mes": 12,
		"novosClientes": 1
	}
]
```
