import gql from 'graphql-tag';

export const REGISTRAR_RESTAURANTE = gql`
  mutation RegistrarRestaurante($registro: RegistroDeRestaurante) {
    registrarRestaurante(registro: $registro) {
      token
      restaurante {
        _id
        bloqueado
      }
    }
  }
`

export const LOGAR_RESTAURANTE = gql `
  mutation LogarRestaurante($email: String!, $senha: String!) {
    logarRestaurante(email: $email, senha: $senha) {
      token
      restaurante {
        _id
        bloqueado
      }
    }
  }
`