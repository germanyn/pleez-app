import gql from 'graphql-tag';

export const CRIAR_PRODUTO = gql`
  mutation CriarProduto($produtoInput: CriarProdutoInput!) {
    criarProduto(produto: $produtoInput) {
      _id
      nome
      preco
      descricao
      categoria {
        _id
      }
    }
  }
`

export const ATUALIZAR_PRODUTO = gql`
  mutation AtualizarProduto($id: String!, $produtoInput: AtualizarProdutoInput!) {
    atualizarProduto(id: $id, produto: $produtoInput) {
      _id
      nome
      descricao
      preco
    }
  }
`

export const DELETAR_PRODUTO = gql`
  mutation DeletarProduto($id: String!) {
    deletarProduto(id: $id) {
      _id
      categoria {
        _id
      }
    }
  }
`