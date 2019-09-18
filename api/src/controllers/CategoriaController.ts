import CategoriaModel from "../models/CategoriaModel"

export async function listarCategorias() {
  return await CategoriaModel.find({}).exec()
}

export async function obterCategoria(id) {
  return await CategoriaModel.findById(id).exec()
}

export async function criarCategoria(input) {
  const categoria = await new CategoriaModel(input).save()
  return categoria.toObject()
}

export async function atualizarCategoria(id: string, categoria) {
  return await CategoriaModel.findByIdAndUpdate(id, categoria, {
    new: true,
  }).exec()
}

export async function deletarCategoria(id) {
  return await CategoriaModel.findByIdAndDelete(id).exec()
}