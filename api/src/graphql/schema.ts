import 'graphql-import-node';
import { makeExecutableSchema } from "graphql-tools";
import { gql } from "apollo-server";
import { merge } from 'lodash'

import * as CategoriaSchemas from './modules/categoria/CategoriaSchemas.graphql'
import * as ProdutoSchemas from './modules/produto/ProdutoSchemas.graphql'
import * as RestauranteSchemas from './modules/restaurante/RestauranteSchemas.graphql'
import * as GlobalSchema from './GlobalSchema.graphql'

import CategoriaResolvers from "./modules/categoria/CategoriaResolvers";
import ProdutoResolvers from "./modules/produto/ProdutoResolvers";
import RestauranteResolvers from "./modules/restaurante/RestauranteResolvers";

export default makeExecutableSchema({
  typeDefs: [
    GlobalSchema,
    CategoriaSchemas,
    ProdutoSchemas,
    RestauranteSchemas,
  ],
  resolvers: merge(
    CategoriaResolvers,
    ProdutoResolvers,
    RestauranteResolvers,
  )
})