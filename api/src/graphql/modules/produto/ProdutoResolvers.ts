import { getCategoria } from './../categoria/CategoriaResolvers';
import { listarProdutos, criarProduto, atualizarProduto, deletarProduto, obterProduto } from "../../../controllers/ProdutoController"

export default {
  Query: {
    produto: async (id) => getProduto(id),
    produtos: async () => (await listarProdutos()).map(produtoGetter),
  },
  Mutation: <any> {
    criarProduto: async (root, input) => {
      return await criarProduto(input.produto)
    },
    atualizarProduto: async (root, input) => {
      return await atualizarProduto(input.id, input.produto)
    },
    deletarProduto: async (root, input) => {
      return await deletarProduto(input.id)
    }
  }
}

export const getProduto = async (id: any) => {
  console.log('produto ',id)
  const produto = (await obterProduto(id))
  return produtoGetter(produto)
}

export function produtoGetter(produto) {
  const obj = produto.toObject()
  const resolver = {
    ...obj,
  }
  Object.defineProperty(resolver, 'categorias', {
    async get() {
      return obj.categorias.map(getCategoria)
    }
  })
  return resolver
}