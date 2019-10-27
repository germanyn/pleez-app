import { Cliente } from './cliente';
export type TipoSituacaoDoPedido =
  'recebido' |
  'em-preparo' |
  'finalizado' |
  'rejeitado' |
  'cancelado'

export type ItemDoPedido = {
  quantidade: number
  produto: Produto
}

export type Pedido = {
  _id: string
  cliente: Cliente
  situacao: TipoSituacaoDoPedido
  itens: ItemDoPedido[]
}

export type SituacaoDoPedido = {
  tipo: TipoSituacaoDoPedido
  descricao: string
  proximo?: TipoSituacaoDoPedido
  anterior?: TipoSituacaoDoPedido
  acaoProximo?: string,
  rejeitar?: TipoSituacaoDoPedido,
  acaoRejeitar?: string,
}