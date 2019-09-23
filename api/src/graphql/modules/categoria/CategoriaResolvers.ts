import { listarCategorias, criarCategoria, atualizarCategoria, deletarCategoria, obterCategoria } from "../../../controllers/CategoriaController"
import { getProduto } from '../produto/ProdutoResolvers';

export default {
  Query: <any> {
    categoria: async (id) => getCategoria(id),
    categorias: async () => (await listarCategorias()).map(categoriaGetter),
  },
  Mutation: <any> {
    criarCategoria: async (root, input) => {
      return criarCategoria(input.categoria).then(categoriaGetter)
    },
    atualizarCategoria: async (root, input) => {
      return atualizarCategoria(input.id, input.categoria).then(categoriaGetter)
    },
    deletarCategoria: async (root, input) => {
      return deletarCategoria(input.id).then(categoriaGetter)
    }
  }
}

export const getCategoria = async (id: any) => {
  const categoria = (await obterCategoria(id))
  return categoriaGetter(categoria)
}

export function categoriaGetter(categoria) {
  const obj = categoria.toObject()
  const resolver = {
    ...obj,
  }
  Object.defineProperty(resolver, 'produtos', {
    async get() {
      return obj.produtos.map(getProduto)
    }
  })
  return resolver
}