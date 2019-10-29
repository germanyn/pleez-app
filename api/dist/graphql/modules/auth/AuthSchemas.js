"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.default = apollo_server_1.gql `
type Login {
  restaurante: Restaurante
  token: String!
}

input RegistroDeRestaurante {
  nome: String!
  cnpj: String!
  email: String!
  telefone: String!
  senha: String!
}

extend type Mutation {
  registrarRestaurante(registro: RegistroDeRestaurante): Login!
  logarRestaurante(email: String!, senha: String!): Login!
}
`;
//# sourceMappingURL=AuthSchemas.js.map