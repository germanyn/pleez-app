import gql from 'graphql-tag';

export const CRIAR_CATEGORIA = gql`
  mutation CriarCategoria($input: CriarCategoriaInput!) {
    criarCategoria(categoria: $input) {
      _id
      nome
      produtos {
        _id
      }
    }
  }
`

export const ATUALIZAR_CATEGORIA = gql`
  mutation AtualizarCategoria($id: String!, $categoriaInput: AtualizarCategoriaInput!) {
    atualizarCategoria(id: $id, categoria: $categoriaInput) {
      _id
      nome
    }
  }
`

export const DELETAR_CATEGORIA = gql`
  mutation DeletarCategoria($id: String!) {
    deletarCategoria(id: $id) {
      _id
    }
  }
`

export const TROCAR_PRODUTOS_DA_CATEGORIA = gql`
  mutation TrocarProdutosDaCategoria($idCategoria: String!, $indiceA: Int!, $indiceB: Int!) {
    trocarOrdemProdutosDaCategoria(idCategoria: $idCategoria, indiceA: $indiceA, indiceB: $indiceB) {
      indiceA
      indiceB
    }
  }
`