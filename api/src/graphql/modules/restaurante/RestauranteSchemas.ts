import { gql } from 'apollo-server';
export default gql`
type Restaurante {
  _id: ID!
  nome: String!
  categorias: [Categoria]
  email: String
  cnpj: String
  telefone: String
  bloqueado: Boolean
}

input AtualizarRestauranteInput {
  nome: String
  cnpj: String
  email: String
  telefone: String
  categorias: [String]
}

extend type Query {
  restaurante(id: String): Restaurante
  restaurantes: [Restaurante]
}

extend type Mutation {
  atualizarRestaurante(id: String!, restaurante: AtualizarRestauranteInput!): Restaurante!
  deletarRestaurante(id: String): Restaurante!
}
`