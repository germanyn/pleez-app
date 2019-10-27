import gql from 'graphql-tag';

export const OBTER_PEDIDOS = gql`
  query BuscarPedidosAdmin {
    pedidos(filtros: {
      situacao: [ "recebido", "finalizado" ]
    }) {
      _id
      situacao
      cliente {
        nome
      }
    }
  }
`

export const OBTER_PEDIDO = gql`
  query BuscarPedidoAdmin($id: String!) {
    pedido(id: $id) {
      _id
      situacao
      cliente {
        nome
      }
      itens {
        quantidade
        produto {
          nome
          preco
          descricao
        }
      }
    }
  }
`
