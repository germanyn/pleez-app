export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};









export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
};

export type AtualizarCategoriaInput = {
  nome?: Maybe<Scalars['String']>,
  categorias?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type AtualizarProdutoInput = {
  nome?: Maybe<Scalars['String']>,
  produtos?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type Categoria = {
   __typename?: 'Categoria',
  id: Scalars['ID'],
  nome: Scalars['String'],
  produtos?: Maybe<Array<Maybe<Produto>>>,
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
  criarCategoria?: Maybe<Categoria>,
  atualizarCategoria?: Maybe<Categoria>,
  deletarCategoria?: Maybe<Scalars['String']>,
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

export type Produto = {
   __typename?: 'Produto',
  _id: Scalars['ID'],
  nome: Scalars['String'],
  descricaco?: Maybe<Scalars['String']>,
};

export type ProdutoMutations = {
   __typename?: 'ProdutoMutations',
  criarProduto?: Maybe<Produto>,
  atualizarProduto?: Maybe<Produto>,
  deletarProduto?: Maybe<Produto>,
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
  categorias?: Maybe<Array<Maybe<Categoria>>>,
};
import { ObjectID } from 'mongodb';