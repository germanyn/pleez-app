import {
  SituacaoDoPedido,
  Pedido,
} from './types';

export const somarPrecoTotalPedido = (pedido: Pedido) => {
  return pedido.itens.reduce((total, item)=> total + item.preco, 0)
}

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

export const situacoesDePedido: SituacaoDoPedido[] = [
  situacoesDePedidoDictionary['recebido'],
  situacoesDePedidoDictionary['em-preparo'],
  situacoesDePedidoDictionary['finalizado'],
]