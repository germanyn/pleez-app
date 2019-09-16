import Categoria from "./Categoria";

export default interface Produto {
  nome: string
  categorias: Categoria[]
}

export interface CriarProdutoInput {
  nome: string
}

export interface AtualizarProdutoInput {
  nome?: string
  categorias?: string[]
}