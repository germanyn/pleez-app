import { listarProdutos, criarProduto, atualizarProduto, deletarProduto } from "../../../controllers/ProdutoController"
import { CriarProdutoInput, AtualizarProdutoInput } from "../../../../../types/Produto"
import { ProdutoQueries } from "../../../../../types/graphql-resolvers"

export default {
  ProdutoQueries: {
    produtos: async () => await listarProdutos(),
  },
  ProdutoMutations: {
    criarProduto: async (root, input: { produto: CriarProdutoInput}) => {
      return await criarProduto(input.produto)
    },
    atualizarProduto: async (root, input: { id: string, produto: AtualizarProdutoInput}) => {
      return await atualizarProduto(input.id, input.produto)
    },
    deletarProduto: async (root, input: { id: string }) => {
      return await deletarProduto(input.id)
    }
  }
}