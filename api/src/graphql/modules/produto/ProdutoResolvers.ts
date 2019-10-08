import { getCategoria } from './../categoria/CategoriaResolvers';
import { listarProdutos, criarProduto, atualizarProduto, deletarProduto, obterProduto } from "../../../controllers/ProdutoController"

export default {
  Query: {
    produto: async (root, { id }) => getProduto(id),
    produtos: async () => (await listarProdutos()).map(produtoGetter),
  },
  Mutation: <any> {
    criarProduto: async (root, input) => {
      return criarProduto(input.produto).then(produtoGetter)
    },
    atualizarProduto: async (root, input) => {
      return atualizarProduto(input.id, input.produto).then(produtoGetter)
    },
    deletarProduto: async (root, input) => {
      return deletarProduto(input.id).then(produtoGetter)
    }
  }
}

export const getProduto = async (id: any) => {
  const produto = (await obterProduto(id))
  return produtoGetter(produto)
}

export function produtoGetter(produto) {
  const obj = produto.toObject()
  const resolver = {
    ...obj,
  }
  Object.defineProperty(resolver, 'categoria', {
    async get() {
      return getCategoria(obj.categoria)
    }
  })
  return resolver
}