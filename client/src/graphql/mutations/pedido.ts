import gql from 'graphql-tag';

export const ATUALIZAR_SITUACAO_PEDIDO = gql`
  mutation AtualizarSituacaoPedido(
      $id: String!
      $pedido: AtualizarPedidoInput!
    ) {
    atualizarPedido(id: $id, pedido: $pedido) {
      _id
      situacao
    }
  }
`