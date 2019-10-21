import CategoriaController from "../../../controllers/CategoriaController"
import { getProduto } from '../produto/ProdutoResolvers';

export default {
  Query: <any> {
    categoria: async (root, { id }) => getCategoria(id),
    categorias: async () => (await CategoriaController.listar()).map(categoriaGetter),
  },
  Mutation: <any> {
    criarCategoria: async (root, input) => {
      return CategoriaController.criar(input.categoria).then(categoriaGetter)
    },
    atualizarCategoria: async (root, input) => {
      return CategoriaController.atualizar(input.id, input.categoria).then(categoriaGetter)
    },
    deletarCategoria: async (root, input) => {
      return CategoriaController.deletar(input.id).then(categoriaGetter)
    },
    trocarOrdemProdutosDaCategoria: async (root, { idCategoria, indiceA, indiceB }) => {
      await CategoriaController.trocarOrdemProdutos(idCategoria, indiceA, indiceB)
      return {
        indiceA,
        indiceB,
      }
    }
  }
}

export const getCategoria = async (id: any) => {
  const categoria = (await CategoriaController.obter(id))
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