import { getCliente } from './../cliente/ClienteResolvers';
import PedidoController from "../../../controllers/PedidoController"

export default {
  Query: {
    pedido: async (root, { id }) => getPedido(id),
    pedidos: async (root, { filtros }) => (await PedidoController.listar(filtros)).map(pedidoGetter),
  },
  Mutation: <any> {
    criarPedido: async (root, input) => {
      return PedidoController.criar(input.pedido).then(pedidoGetter)
    },
    atualizarPedido: async (root, input) => {
      return PedidoController.atualizar(input.id, input.pedido).then(pedidoGetter)
    },
    deletarPedido: async (root, input) => {
      return PedidoController.deletar(input.id).then(pedidoGetter)
    }
  }
}

export const getPedido = async (id: any) => {
  const pedido = (await PedidoController.obter(id))
  return pedidoGetter(pedido)
}

export function pedidoGetter(pedido) {
  const obj = pedido.toObject()
  const resolver = {
    ...obj,
  }
  Object.defineProperty(resolver, 'cliente', {
    async get() {
      return getCliente(pedido.cliente)
    }
  })
  return resolver
}