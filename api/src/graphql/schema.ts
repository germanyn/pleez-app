import 'graphql-import-node';
import { makeExecutableSchema } from "graphql-tools";
import { gql } from "apollo-server";
import { merge } from 'lodash'

import * as CategoriaSchemas from './modules/categoria/CategoriaSchemas.graphql'
import * as ProdutosSchemas from './modules/produto/ProdutoSchemas.graphql'
import * as GlobalSchema from './GlobalSchema.graphql'
import CategoriaResolvers from "./modules/categoria/CategoriaResolvers";
import ProdutoResolvers from "./modules/produto/ProdutoResolvers";

export default makeExecutableSchema({
  typeDefs: [
    GlobalSchema,
    CategoriaSchemas,
    ProdutosSchemas,
  ],
  resolvers: merge(
    CategoriaResolvers,
    ProdutoResolvers,
  )
})