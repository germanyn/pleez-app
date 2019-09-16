import Produto from "./Produto";

export default interface Categoria {
  id: string
  nome: string
  produtos: Produto[]
}

export interface CriarCategoriaInput {
  nome: string
}

export interface AtualizarCategoriaInput {
  nome?: string
  produtos?: string[]
}