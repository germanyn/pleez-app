"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
type Categoria {
  _id: ID!
  nome: String!
  produtos: [Produto]
  restaurante: Restaurante!
}

input CriarCategoriaInput {
  nome: String!
}

input AtualizarCategoriaInput {
  nome: String
  produtos: [String]
}

extend type Query {
  categoria(id: String): Categoria
  categorias: [Categoria]
}

type ProdutosOrdenadosCategoria {
  indiceA: Int!
  indiceB: Int!
}

extend type Mutation {
  criarCategoria(categoria: CriarCategoriaInput): Categoria!
  atualizarCategoria(id: String!, categoria: AtualizarCategoriaInput!): Categoria!
  deletarCategoria(id: String): Categoria!
  trocarOrdemProdutosDaCategoria(idCategoria: String!, indiceA: Int!, indiceB: Int!): ProdutosOrdenadosCategoria!
}
`;
//# sourceMappingURL=CategoriaSchemas.js.map