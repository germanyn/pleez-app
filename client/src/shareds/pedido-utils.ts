import { TipoSituacaoDoPedido } from './../types/pedido.d';
import {
  SituacaoDoPedido,
  Pedido,
} from '../types/pedido';

export const somarPrecoTotalPedido = (pedido: Pedido) => {
  return pedido.itens.reduce((total, item)=> total + item.produto.preco * item.quantidade, 0)
}

export const situacoesDePedidoDictionary: {[tipo: string]: SituacaoDoPedido} = {
  'recebido': {
    tipo: 'recebido',
    descricao: 'Recebido',
    proximo: 'em-preparo',
    acaoProximo: 'Aceitar',
    rejeitar: 'rejeitado',
    acaoRejeitar: 'Rejeitar',
  },
  'em-preparo': {
    tipo: 'em-preparo',
    descricao: 'Em Preparo',
    anterior: 'recebido',
    proximo: 'finalizado',
    acaoProximo: 'Pedido Entregue',
    rejeitar: 'cancelado',
    acaoRejeitar: 'Cancelar o Pedido',
  },
  'finalizado': {
    tipo: 'finalizado',
    anterior: 'em-preparo',
    descricao: 'Finalizado',
  },
  'rejeitado': {
    tipo: 'rejeitado',
    descricao: 'Rejeitado',
  },
  'cancelado': {
    tipo: 'cancelado',
    descricao: 'Cancelado',
  },
}

export const situacoesDePedido: SituacaoDoPedido[] = [
  situacoesDePedidoDictionary['recebido'],
  situacoesDePedidoDictionary['em-preparo'],
  situacoesDePedidoDictionary['finalizado'],
]

export const situacoesDoAdmin: TipoSituacaoDoPedido[] = [
  'recebido', 'em-preparo', 'finalizado'
]

export const ordernarPorTipoDeSituacao = (pedidoA: Pedido, pedidoB: Pedido) => {
  return situacoesDoAdmin.indexOf(pedidoA.situacao) - situacoesDoAdmin.indexOf(pedidoB.situacao)
}