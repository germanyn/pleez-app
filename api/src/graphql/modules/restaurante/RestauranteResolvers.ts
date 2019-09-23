import { listarRestaurantes, criarRestaurante, atualizarRestaurante, deletarRestaurante, obterRestaurante } from "../../../controllers/RestauranteController"
import { getCategoria } from "../categoria/CategoriaResolvers";

export default {
  Query: <any> {
    restaurante: async (id) => getRestaurante(id),
    restaurantes: async () => (await listarRestaurantes()).map(restauranteGetter),
  },
  Mutation: <any> {
    criarRestaurante: async (root, input) => {
      return criarRestaurante(input.restaurante).then(restauranteGetter)
    },
    atualizarRestaurante: async (root, input) => {
      return atualizarRestaurante(input.id, input.restaurante).then(restauranteGetter)
    },
    deletarRestaurante: async (root, input) => {
      return deletarRestaurante(input.id).then(restauranteGetter)
    }
  }
}

export const getRestaurante = async (id: any) => {
  const restaurante = (await obterRestaurante(id))
  return restauranteGetter(restaurante)
}

export function restauranteGetter(restaurante) {
  const obj = restaurante.toObject()
  const resolver = {
    ...obj,
  }
  Object.defineProperty(resolver, 'categorias', {
    async get() {
      return obj.categorias.map(getCategoria)
    }
  })
  return resolver
}