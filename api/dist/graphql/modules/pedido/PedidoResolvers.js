"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClienteResolvers_1 = require("./../cliente/ClienteResolvers");
const PedidoController_1 = __importDefault(require("../../../controllers/PedidoController"));
exports.default = {
    Query: {
        pedido: async (root, { id }) => exports.getPedido(id),
        pedidos: async (root, { filtros }) => (await PedidoController_1.default.listar(filtros)).map(pedidoGetter),
    },
    Mutation: {
        criarPedido: async (root, input) => {
            return PedidoController_1.default.criar(input.pedido).then(pedidoGetter);
        },
        atualizarPedido: async (root, input) => {
            return PedidoController_1.default.atualizar(input.id, input.pedido).then(pedidoGetter);
        },
        deletarPedido: async (root, input) => {
            return PedidoController_1.default.deletar(input.id).then(pedidoGetter);
        }
    }
};
exports.getPedido = async (id) => {
    const pedido = (await PedidoController_1.default.obter(id));
    return pedidoGetter(pedido);
};
function pedidoGetter(pedido) {
    const obj = pedido.toObject();
    const resolver = {
        ...obj,
    };
    Object.defineProperty(resolver, 'cliente', {
        async get() {
            return ClienteResolvers_1.getCliente(pedido.cliente);
        }
    });
    return resolver;
}
exports.pedidoGetter = pedidoGetter;
//# sourceMappingURL=PedidoResolvers.js.map