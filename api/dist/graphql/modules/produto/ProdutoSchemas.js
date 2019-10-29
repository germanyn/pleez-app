"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
type Produto {
  _id: ID!
  nome: String!
  descricao: String
  preco: Float
  categoria: Categoria
}

input CriarProdutoInput {
  nome: String!
  preco: Float!
  descricao: String
  categoria: String!
}

input AtualizarProdutoInput {
  nome: String
  preco: Float
  descricao: String
  categoria: String
}

extend type Query {
  produto(id: String): Produto
  produtos: [Produto]
}

extend type Mutation {
  criarProduto(produto: CriarProdutoInput!): Produto!
  atualizarProduto(id: String!, produto: AtualizarProdutoInput!): Produto!
  deletarProduto(id: String!): Produto!
}
`;
//# sourceMappingURL=ProdutoSchemas.js.map