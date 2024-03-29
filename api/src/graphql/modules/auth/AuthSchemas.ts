import { gql } from 'apollo-server';
export default gql`
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
`