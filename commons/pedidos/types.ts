export type TipoSituacaoDoPedido = 'recebido' | 'em-preparo' | 'finalizado'

export type ItemDoPedido = {
  quantidade: number
  nome: string
  preco: number
}

export type Pedido = {
  _id: string,
  nome: string,
  situacao: TipoSituacaoDoPedido,
  itens: ItemDoPedido[]
}

export type SituacaoDoPedido = {
  tipo: TipoSituacaoDoPedido
  descricao: string
}