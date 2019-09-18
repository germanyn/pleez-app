import Categoria from "./Categoria";

export default interface Produto {
  nome: string
  descricao?: string
  categorias: Categoria[]
}