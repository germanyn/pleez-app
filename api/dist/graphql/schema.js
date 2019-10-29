"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const lodash_1 = require("lodash");
const ClienteSchemas_1 = __importDefault(require("./modules/cliente/ClienteSchemas"));
const PedidoSchemas_1 = __importDefault(require("./modules/pedido/PedidoSchemas"));
const CategoriaSchemas_1 = __importDefault(require("./modules/categoria/CategoriaSchemas"));
const ProdutoSchemas_1 = __importDefault(require("./modules/produto/ProdutoSchemas"));
const RestauranteSchemas_1 = __importDefault(require("./modules/restaurante/RestauranteSchemas"));
const AuthSchemas_1 = __importDefault(require("./modules/auth/AuthSchemas"));
const GlobalSchema_1 = __importDefault(require("./GlobalSchema"));
const ClienteResolvers_1 = __importDefault(require("./modules/cliente/ClienteResolvers"));
const PedidoResolvers_1 = __importDefault(require("./modules/pedido/PedidoResolvers"));
const CategoriaResolvers_1 = __importDefault(require("./modules/categoria/CategoriaResolvers"));
const ProdutoResolvers_1 = __importDefault(require("./modules/produto/ProdutoResolvers"));
const RestauranteResolvers_1 = __importDefault(require("./modules/restaurante/RestauranteResolvers"));
const AuthResolvers_1 = __importDefault(require("./modules/auth/AuthResolvers"));
exports.default = graphql_tools_1.makeExecutableSchema({
    typeDefs: [
        ClienteSchemas_1.default,
        PedidoSchemas_1.default,
        CategoriaSchemas_1.default,
        ProdutoSchemas_1.default,
        RestauranteSchemas_1.default,
        AuthSchemas_1.default,
        GlobalSchema_1.default,
    ],
    resolvers: lodash_1.merge(ClienteResolvers_1.default, PedidoResolvers_1.default, CategoriaResolvers_1.default, ProdutoResolvers_1.default, RestauranteResolvers_1.default, AuthResolvers_1.default)
});
//# sourceMappingURL=schema.js.map