import Produto from "./Produto";
import Restaurante from "./Restaurante";

export default interface Categoria {
  nome: string
  produtos: Produto[]
  restaurante: Restaurante
}