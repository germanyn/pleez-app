"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RestauranteController_1 = require("../../../controllers/RestauranteController");
const CategoriaResolvers_1 = require("../categoria/CategoriaResolvers");
exports.default = {
    Query: {
        restaurante: async (id) => exports.getRestaurante(id),
        restaurantes: async () => (await RestauranteController_1.listarRestaurantes()).map(restauranteGetter),
    },
    Mutation: {
        atualizarRestaurante: async (root, input) => {
            return RestauranteController_1.atualizarRestaurante(input.id, input.restaurante).then(restauranteGetter);
        },
        deletarRestaurante: async (root, input) => {
            return RestauranteController_1.deletarRestaurante(input.id).then(restauranteGetter);
        },
    }
};
exports.getRestaurante = async (id) => {
    const restaurante = (await RestauranteController_1.obterRestaurante(id));
    return restauranteGetter(restaurante);
};
function restauranteGetter(restaurante) {
    const obj = restaurante.toObject();
    const resolver = {
        ...obj,
    };
    Object.defineProperty(resolver, 'categorias', {
        async get() {
            return obj.categorias.map(CategoriaResolvers_1.getCategoria);
        }
    });
    return resolver;
}
exports.restauranteGetter = restauranteGetter;
//# sourceMappingURL=RestauranteResolvers.js.map