import { makeExecutableSchema } from "graphql-tools";
import { merge } from 'lodash'

import ClienteSchemas from './modules/cliente/ClienteSchemas'
import PedidoSchemas from './modules/pedido/PedidoSchemas'
import CategoriaSchemas from './modules/categoria/CategoriaSchemas'
import ProdutoSchemas from './modules/produto/ProdutoSchemas'
import RestauranteSchemas from './modules/restaurante/RestauranteSchemas'
import AuthSchemas from './modules/auth/AuthSchemas'
import GlobalSchema from './GlobalSchema'

import ClienteResolvers from "./modules/cliente/ClienteResolvers";
import PedidoResolvers from "./modules/pedido/PedidoResolvers";
import CategoriaResolvers from "./modules/categoria/CategoriaResolvers";
import ProdutoResolvers from "./modules/produto/ProdutoResolvers";
import RestauranteResolvers from "./modules/restaurante/RestauranteResolvers";
import AuthResolvers from "./modules/auth/AuthResolvers";

export default makeExecutableSchema({
  typeDefs: [
    ClienteSchemas,
    PedidoSchemas,
    CategoriaSchemas,
    ProdutoSchemas,
    RestauranteSchemas,
    AuthSchemas,
    GlobalSchema,
  ],
  resolvers: merge(
    ClienteResolvers,
    PedidoResolvers,
    CategoriaResolvers,
    ProdutoResolvers,
    RestauranteResolvers,
    AuthResolvers,
  )
})