import { CriarCategoriaInput, AtualizarCategoriaInput } from "../../../types/Categoria"
import CategoriaModel from "../models/CategoriaModel"

export async function criarCategoria(input: CriarCategoriaInput) {
  const categoria = await new CategoriaModel(input).save()
  return categoria.toObject()
}

export async function listarCategorias() {
  return await CategoriaModel.find({}).exec()
}

export async function atualizarCategoria(id: string, categoria: AtualizarCategoriaInput) {
  return await CategoriaModel.findByIdAndUpdate(id, categoria, {
    new: true,
  }).exec()
}

export async function deletarCategoria(id) {
  return await CategoriaModel.findByIdAndDelete(id).exec()
}