"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
type ItemDoPedido {
  produto: Produto
  quantidade: Int
}

type Pedido {
  _id: ID!
  restaurante: Restaurante!
  cliente: Cliente!
  data: String
  situacao: String
  itens: [ItemDoPedido]
}

input CriarItemDoPedidoInput {
  produto: String
  quantidade: Int
}

input CriarPedidoInput {
  restaurante: String!
  cliente: String!
  itens: [CriarItemDoPedidoInput]!
}

input AtualizarItemDoPedidoInput {
  produto: String
  quantidade: Int
}

input AtualizarPedidoInput {
  situacao: String
  itens: [AtualizarItemDoPedidoInput]
}

input FiltrosDePedido {
  situacao: [String]
}

extend type Query {
  pedido(id: String!): Pedido
  pedidos(filtros: FiltrosDePedido): [Pedido]
}

extend type Mutation {
  criarPedido(pedido: CriarPedidoInput): Pedido!
  atualizarPedido(id: String!, pedido: AtualizarPedidoInput!): Pedido!
  deletarPedido(id: String): Pedido!
}
`;
//# sourceMappingURL=PedidoSchemas.js.map