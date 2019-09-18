import Produto from "./Produto";

export default interface Categoria {
  nome: string
  produtos: Produto[]
}