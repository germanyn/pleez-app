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

export const somarPrecoTotalPedido = (pedido: Pedido) => {
  return pedido.itens.reduce((total, item)=> total + item.preco, 0)
}

export const situacoesDePedido: SituacaoDoPedido[] = [
    {
      tipo: 'recebido',
      descricao: 'Recebido',
    },
    {
      tipo: 'em-preparo',
      descricao: 'Em Preparo',
    },
    {
      tipo: 'finalizado',
      descricao: 'Finalizado',
    },
  ]

export const situacoesDePedidoDictionary: {[tipo: string]: SituacaoDoPedido} = {
  'recebido': {
    tipo: 'recebido',
    descricao: 'Recebido',
  },
  'em-preparo': {
    tipo: 'em-preparo',
    descricao: 'Em Preparo',
  },
  'finalizado': {
    tipo: 'finalizado',
    descricao: 'Finalizado',
  },
}