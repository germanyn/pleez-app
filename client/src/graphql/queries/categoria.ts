import gql from 'graphql-tag';

export const OBTER_CATEGORIAS = gql`
  query BuscarCategoriasAdmin {
    categorias {
      _id
      nome
    }
  }
`

export const OBTER_CATEGORIA = gql`
  query BuscarCategoriaAdmin($id: String!) {
    categoria(id: $id) {
      _id
      nome
      produtos {
        _id
        nome
        preco
        descricao
      }
    }
  }
`
