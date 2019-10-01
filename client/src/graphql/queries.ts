import gql from 'graphql-tag';

export const OBTER_CATEGORIAS = gql`
  query BuscarCategoriasAdmin {
    categorias {
      _id
      nome
      produtos {
        _id
        nome
        preco
      }
    }
  }
`
