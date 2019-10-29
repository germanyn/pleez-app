"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./graphql/schema"));
const { PORT = 4000, } = process.env;
const app = express_1.default();
const graphServer = new apollo_server_express_1.ApolloServer({
    schema: schema_1.default,
});
graphServer.applyMiddleware({
    app,
    path: '/graphql'
});
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(__dirname + '../client/build/'));
    app.get(/.*/, (_req, res) => res.sendFile(__dirname + '../client/build/index.html'));
}
const ready = app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${graphServer.graphqlPath}`));
exports.ready = ready;
exports.default = app;
//# sourceMappingURL=server.js.map