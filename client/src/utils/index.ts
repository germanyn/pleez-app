export const formatarPreco = (preco: number) => preco.toLocaleString('ptBR', {
  currency: 'BRL',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
})

export const retirarFormatacaoCpfCnpj = (cnpjCpf: string) =>
  cnpjCpf.replace(/-|\/|\.\./g, '')