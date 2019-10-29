"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClienteController_1 = __importDefault(require("../../../controllers/ClienteController"));
exports.default = {
    Query: {},
    Mutation: {}
};
exports.getCliente = async (id) => {
    const produto = (await ClienteController_1.default.obter(id));
    return clienteGetter(produto);
};
function clienteGetter(cliente) {
    const obj = cliente.toObject();
    const resolver = {
        ...obj,
    };
    Object.defineProperty(resolver, 'produtos', {
        async get() {
            return obj.produtos.map(exports.getCliente);
        }
    });
    return resolver;
}
exports.clienteGetter = clienteGetter;
//# sourceMappingURL=ClienteResolvers.js.map