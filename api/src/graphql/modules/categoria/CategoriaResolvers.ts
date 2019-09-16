import { listarCategorias, criarCategoria, atualizarCategoria, deletarCategoria } from "../../../controllers/CategoriaController"
import { CriarCategoriaInput, AtualizarCategoriaInput } from "../../../../../types/Categoria"

export default {
  Query: {
    categorias: async () =>{
      return await listarCategorias()
    }
  },
  Mutation: {
    criarCategoria: async (root, input: { categoria: CriarCategoriaInput}) => {
      return await criarCategoria(input.categoria)
    },
    atualizarCategoria: async (root, input: { id: string, categoria: AtualizarCategoriaInput}) => {
      return await atualizarCategoria(input.id, input.categoria)
    },
    deletarCategoria: async (root, input: { id: string }) => {
      return await deletarCategoria(input.id)
    }
  }
}