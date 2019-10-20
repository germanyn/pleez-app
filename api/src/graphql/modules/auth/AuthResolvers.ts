import { getRestaurante } from './../restaurante/RestauranteResolvers';
import { registrarRestaurante, logarRestaurante } from "../../../controllers/AuthController";

export default {
  Mutation: {
    registrarRestaurante: async (root, {registro}) => {
      return registrarRestaurante(registro).then(loginGetter)
    },
    logarRestaurante: async (root, { email, senha }) => {
      return logarRestaurante(email, senha).then(loginGetter)
    },
  }
}

export function loginGetter(login: DenormalizedLogin) {
  const resolver = {
    ...login,
  }
  Object.defineProperty(resolver, 'restaurante', {
    async get() {
      return getRestaurante(login.restaurante)
    }
  })
  return resolver
}

interface DenormalizedLogin {
  token: string
  restaurante: string
}