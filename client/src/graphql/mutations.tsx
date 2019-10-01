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

export const INCLUIR_PRODUTO_CATEGORIA = gql`
  mutation CriarProduto($produtoInput: CriarProdutoInput!) {
    criarProduto(produto: $produtoInput) {
      _id
      nome
      preco
    }
  }
`