import ClienteController from "../../../controllers/ClienteController"

export default {
  Query: {},
  Mutation: <any> {}
}

export const getCliente = async (id: any) => {
  const produto = (await ClienteController.obter(id))
  return clienteGetter(produto)
}

export function clienteGetter(cliente) {
  const obj = cliente.toObject()
  const resolver = {
    ...obj,
  }
  Object.defineProperty(resolver, 'produtos', {
    async get() {
      return obj.produtos.map(getCliente)
    }
  })
  return resolver
}