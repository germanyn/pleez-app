import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type AtualizarCategoriaInput = {
  nome?: Maybe<Scalars['String']>,
  produtos?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type AtualizarProdutoInput = {
  nome?: Maybe<Scalars['String']>,
  categorias?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type Categoria = {
   __typename?: 'Categoria',
  _id: Scalars['ID'],
  nome: Scalars['String'],
  produtos?: Maybe<Array<Maybe<Produto>>>,
};

export type CategoriaMutations = {
   __typename?: 'CategoriaMutations',
  criarCategoria: Categoria,
  atualizarCategoria: Categoria,
  deletarCategoria: Categoria,
};


export type CategoriaMutationsCriarCategoriaArgs = {
  categoria?: Maybe<CriarCategoriaInput>
};


export type CategoriaMutationsAtualizarCategoriaArgs = {
  id: Scalars['String'],
  categoria: AtualizarCategoriaInput
};


export type CategoriaMutationsDeletarCategoriaArgs = {
  id?: Maybe<Scalars['String']>
};

export type CategoriaQueries = {
   __typename?: 'CategoriaQueries',
  categorias?: Maybe<Array<Maybe<Categoria>>>,
};

export type CriarCategoriaInput = {
  nome: Scalars['String'],
};

export type CriarProdutoInput = {
  nome: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  _empty?: Maybe<Scalars['String']>,
};

export type Produto = {
   __typename?: 'Produto',
  _id: Scalars['ID'],
  nome: Scalars['String'],
  descricaco?: Maybe<Scalars['String']>,
  categorias?: Maybe<Array<Maybe<Categoria>>>,
};

export type ProdutoMutations = {
   __typename?: 'ProdutoMutations',
  criarProduto: Produto,
  atualizarProduto: Produto,
  deletarProduto: Produto,
};


export type ProdutoMutationsCriarProdutoArgs = {
  produto: CriarProdutoInput
};


export type ProdutoMutationsAtualizarProdutoArgs = {
  id: Scalars['String'],
  produto: AtualizarProdutoInput
};


export type ProdutoMutationsDeletarProdutoArgs = {
  id: Scalars['String']
};

export type ProdutoQueries = {
   __typename?: 'ProdutoQueries',
  produtos?: Maybe<Array<Maybe<Produto>>>,
};

export type Query = {
   __typename?: 'Query',
  _empty?: Maybe<Scalars['String']>,
};


export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Mutation: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  AtualizarCategoriaInput: AtualizarCategoriaInput,
  AtualizarProdutoInput: AtualizarProdutoInput,
  Categoria: ResolverTypeWrapper<Categoria>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Produto: ResolverTypeWrapper<Produto>,
  CategoriaMutations: ResolverTypeWrapper<CategoriaMutations>,
  CriarCategoriaInput: CriarCategoriaInput,
  CategoriaQueries: ResolverTypeWrapper<CategoriaQueries>,
  CriarProdutoInput: CriarProdutoInput,
  ProdutoMutations: ResolverTypeWrapper<ProdutoMutations>,
  ProdutoQueries: ResolverTypeWrapper<ProdutoQueries>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  Mutation: {},
  Boolean: Scalars['Boolean'],
  AtualizarCategoriaInput: AtualizarCategoriaInput,
  AtualizarProdutoInput: AtualizarProdutoInput,
  Categoria: Categoria,
  ID: Scalars['ID'],
  Produto: Produto,
  CategoriaMutations: CategoriaMutations,
  CriarCategoriaInput: CriarCategoriaInput,
  CategoriaQueries: CategoriaQueries,
  CriarProdutoInput: CriarProdutoInput,
  ProdutoMutations: ProdutoMutations,
  ProdutoQueries: ProdutoQueries,
};

export type CategoriaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Categoria'] = ResolversParentTypes['Categoria']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  nome?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  produtos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Produto']>>>, ParentType, ContextType>,
};

export type CategoriaMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoriaMutations'] = ResolversParentTypes['CategoriaMutations']> = {
  criarCategoria?: Resolver<ResolversTypes['Categoria'], ParentType, ContextType, CategoriaMutationsCriarCategoriaArgs>,
  atualizarCategoria?: Resolver<ResolversTypes['Categoria'], ParentType, ContextType, RequireFields<CategoriaMutationsAtualizarCategoriaArgs, 'id' | 'categoria'>>,
  deletarCategoria?: Resolver<ResolversTypes['Categoria'], ParentType, ContextType, CategoriaMutationsDeletarCategoriaArgs>,
};

export type CategoriaQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoriaQueries'] = ResolversParentTypes['CategoriaQueries']> = {
  categorias?: Resolver<Maybe<Array<Maybe<ResolversTypes['Categoria']>>>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type ProdutoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Produto'] = ResolversParentTypes['Produto']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  nome?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  descricaco?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  categorias?: Resolver<Maybe<Array<Maybe<ResolversTypes['Categoria']>>>, ParentType, ContextType>,
};

export type ProdutoMutationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProdutoMutations'] = ResolversParentTypes['ProdutoMutations']> = {
  criarProduto?: Resolver<ResolversTypes['Produto'], ParentType, ContextType, RequireFields<ProdutoMutationsCriarProdutoArgs, 'produto'>>,
  atualizarProduto?: Resolver<ResolversTypes['Produto'], ParentType, ContextType, RequireFields<ProdutoMutationsAtualizarProdutoArgs, 'id' | 'produto'>>,
  deletarProduto?: Resolver<ResolversTypes['Produto'], ParentType, ContextType, RequireFields<ProdutoMutationsDeletarProdutoArgs, 'id'>>,
};

export type ProdutoQueriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProdutoQueries'] = ResolversParentTypes['ProdutoQueries']> = {
  produtos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Produto']>>>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Categoria?: CategoriaResolvers<ContextType>,
  CategoriaMutations?: CategoriaMutationsResolvers<ContextType>,
  CategoriaQueries?: CategoriaQueriesResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Produto?: ProdutoResolvers<ContextType>,
  ProdutoMutations?: ProdutoMutationsResolvers<ContextType>,
  ProdutoQueries?: ProdutoQueriesResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
