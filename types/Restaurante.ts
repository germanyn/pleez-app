import { Categoria } from "../api/src/types/graphql";

export default interface Restaurante {
  nome: string
  categorias: Categoria[]
}