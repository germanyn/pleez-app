import 'graphql-import-node';
import { makeExecutableSchema } from "graphql-tools";
import { merge } from 'lodash'

import * as ClienteSchemas from './modules/cliente/ClienteSchemas.graphql'
import * as PedidoSchemas from './modules/pedido/PedidoSchemas.graphql'
import * as CategoriaSchemas from './modules/categoria/CategoriaSchemas.graphql'
import * as ProdutoSchemas from './modules/produto/ProdutoSchemas.graphql'
import * as RestauranteSchemas from './modules/restaurante/RestauranteSchemas.graphql'
import * as AuthSchemas from './modules/auth/AuthSchemas.graphql'
import * as GlobalSchema from './GlobalSchema.graphql'

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