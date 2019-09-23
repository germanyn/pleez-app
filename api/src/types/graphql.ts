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

export type AtualizarRestauranteInput = {
  nome?: Maybe<Scalars['String']>,
  categorias?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type Categoria = {
   __typename?: 'Categoria',
  _id: Scalars['ID'],
  nome: Scalars['String'],
  produtos?: Maybe<Array<Maybe<Produto>>>,
  restaurante?: Maybe<Restaurante>,
};

export type CriarCategoriaInput = {
  nome: Scalars['String'],
};

export type CriarProdutoInput = {
  nome: Scalars['String'],
};

export type CriarRestauranteInput = {
  nome: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  _empty?: Maybe<Scalars['String']>,
  criarCategoria: Categoria,
  atualizarCategoria: Categoria,
  deletarCategoria: Categoria,
  criarProduto: Produto,
  atualizarProduto: Produto,
  deletarProduto: Produto,
  criarRestaurante: Restaurante,
  atualizarRestaurante: Restaurante,
  deletarRestaurante: Restaurante,
};


export type MutationCriarCategoriaArgs = {
  categoria?: Maybe<CriarCategoriaInput>
};


export type MutationAtualizarCategoriaArgs = {
  id: Scalars['String'],
  categoria: AtualizarCategoriaInput
};


export type MutationDeletarCategoriaArgs = {
  id?: Maybe<Scalars['String']>
};


export type MutationCriarProdutoArgs = {
  produto: CriarProdutoInput
};


export type MutationAtualizarProdutoArgs = {
  id: Scalars['String'],
  produto: AtualizarProdutoInput
};


export type MutationDeletarProdutoArgs = {
  id: Scalars['String']
};


export type MutationCriarRestauranteArgs = {
  restaurante?: Maybe<CriarRestauranteInput>
};


export type MutationAtualizarRestauranteArgs = {
  id: Scalars['String'],
  restaurante: AtualizarRestauranteInput
};


export type MutationDeletarRestauranteArgs = {
  id?: Maybe<Scalars['String']>
};

export type Produto = {
   __typename?: 'Produto',
  _id: Scalars['ID'],
  nome: Scalars['String'],
  descricaco?: Maybe<Scalars['String']>,
  categorias?: Maybe<Array<Maybe<Categoria>>>,
};

export type Query = {
   __typename?: 'Query',
  _empty?: Maybe<Scalars['String']>,
  categoria?: Maybe<Categoria>,
  categorias?: Maybe<Array<Maybe<Categoria>>>,
  produto?: Maybe<Produto>,
  produtos?: Maybe<Array<Maybe<Produto>>>,
  restaurante?: Maybe<Restaurante>,
  restaurantes?: Maybe<Array<Maybe<Restaurante>>>,
};


export type QueryCategoriaArgs = {
  id?: Maybe<Scalars['String']>
};


export type QueryProdutoArgs = {
  id?: Maybe<Scalars['String']>
};


export type QueryRestauranteArgs = {
  id?: Maybe<Scalars['String']>
};

export type Restaurante = {
   __typename?: 'Restaurante',
  _id: Scalars['ID'],
  nome: Scalars['String'],
  categorias?: Maybe<Array<Maybe<Categoria>>>,
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
  Categoria: ResolverTypeWrapper<Categoria>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Produto: ResolverTypeWrapper<Produto>,
  Restaurante: ResolverTypeWrapper<Restaurante>,
  Mutation: ResolverTypeWrapper<{}>,
  CriarCategoriaInput: CriarCategoriaInput,
  AtualizarCategoriaInput: AtualizarCategoriaInput,
  CriarProdutoInput: CriarProdutoInput,
  AtualizarProdutoInput: AtualizarProdutoInput,
  CriarRestauranteInput: CriarRestauranteInput,
  AtualizarRestauranteInput: AtualizarRestauranteInput,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  Categoria: Categoria,
  ID: Scalars['ID'],
  Produto: Produto,
  Restaurante: Restaurante,
  Mutation: {},
  CriarCategoriaInput: CriarCategoriaInput,
  AtualizarCategoriaInput: AtualizarCategoriaInput,
  CriarProdutoInput: CriarProdutoInput,
  AtualizarProdutoInput: AtualizarProdutoInput,
  CriarRestauranteInput: CriarRestauranteInput,
  AtualizarRestauranteInput: AtualizarRestauranteInput,
  Boolean: Scalars['Boolean'],
};

export type CategoriaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Categoria'] = ResolversParentTypes['Categoria']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  nome?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  produtos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Produto']>>>, ParentType, ContextType>,
  restaurante?: Resolver<Maybe<ResolversTypes['Restaurante']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  criarCategoria?: Resolver<ResolversTypes['Categoria'], ParentType, ContextType, MutationCriarCategoriaArgs>,
  atualizarCategoria?: Resolver<ResolversTypes['Categoria'], ParentType, ContextType, RequireFields<MutationAtualizarCategoriaArgs, 'id' | 'categoria'>>,
  deletarCategoria?: Resolver<ResolversTypes['Categoria'], ParentType, ContextType, MutationDeletarCategoriaArgs>,
  criarProduto?: Resolver<ResolversTypes['Produto'], ParentType, ContextType, RequireFields<MutationCriarProdutoArgs, 'produto'>>,
  atualizarProduto?: Resolver<ResolversTypes['Produto'], ParentType, ContextType, RequireFields<MutationAtualizarProdutoArgs, 'id' | 'produto'>>,
  deletarProduto?: Resolver<ResolversTypes['Produto'], ParentType, ContextType, RequireFields<MutationDeletarProdutoArgs, 'id'>>,
  criarRestaurante?: Resolver<ResolversTypes['Restaurante'], ParentType, ContextType, MutationCriarRestauranteArgs>,
  atualizarRestaurante?: Resolver<ResolversTypes['Restaurante'], ParentType, ContextType, RequireFields<MutationAtualizarRestauranteArgs, 'id' | 'restaurante'>>,
  deletarRestaurante?: Resolver<ResolversTypes['Restaurante'], ParentType, ContextType, MutationDeletarRestauranteArgs>,
};

export type ProdutoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Produto'] = ResolversParentTypes['Produto']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  nome?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  descricaco?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  categorias?: Resolver<Maybe<Array<Maybe<ResolversTypes['Categoria']>>>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  categoria?: Resolver<Maybe<ResolversTypes['Categoria']>, ParentType, ContextType, QueryCategoriaArgs>,
  categorias?: Resolver<Maybe<Array<Maybe<ResolversTypes['Categoria']>>>, ParentType, ContextType>,
  produto?: Resolver<Maybe<ResolversTypes['Produto']>, ParentType, ContextType, QueryProdutoArgs>,
  produtos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Produto']>>>, ParentType, ContextType>,
  restaurante?: Resolver<Maybe<ResolversTypes['Restaurante']>, ParentType, ContextType, QueryRestauranteArgs>,
  restaurantes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Restaurante']>>>, ParentType, ContextType>,
};

export type RestauranteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Restaurante'] = ResolversParentTypes['Restaurante']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  nome?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  categorias?: Resolver<Maybe<Array<Maybe<ResolversTypes['Categoria']>>>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Categoria?: CategoriaResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Produto?: ProdutoResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Restaurante?: RestauranteResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
