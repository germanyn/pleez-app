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

export const CRIAR_PRODUTO = gql`
  mutation CriarProduto($produtoInput: CriarProdutoInput!) {
    criarProduto(produto: $produtoInput) {
      _id
      nome
      preco
    }
  }
`

export const ATUALIZAR_PRODUTO = gql`
  mutation AtualizarProduto($id: String!, $produtoInput: AtualizarProdutoInput!) {
    atualizarProduto(id: $id, produto: $produtoInput) {
      _id
      nome
      preco
    }
  }
`

export const DELETAR_PRODUTO = gql`
  mutation DeletarProduto($id: String!) {
    deletarProduto(id: $id) {
      _id
    }
  }
`