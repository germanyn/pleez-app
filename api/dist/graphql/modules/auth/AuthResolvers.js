"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RestauranteResolvers_1 = require("./../restaurante/RestauranteResolvers");
const AuthController_1 = require("../../../controllers/AuthController");
exports.default = {
    Mutation: {
        registrarRestaurante: async (root, { registro }) => {
            return AuthController_1.registrarRestaurante(registro).then(loginGetter);
        },
        logarRestaurante: async (root, { email, senha }) => {
            return AuthController_1.logarRestaurante(email, senha).then(loginGetter);
        },
    }
};
function loginGetter(login) {
    const resolver = {
        ...login,
    };
    Object.defineProperty(resolver, 'restaurante', {
        async get() {
            return RestauranteResolvers_1.getRestaurante(login.restaurante);
        }
    });
    return resolver;
}
exports.loginGetter = loginGetter;
//# sourceMappingURL=AuthResolvers.js.map