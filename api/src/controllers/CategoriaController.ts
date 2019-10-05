import CategoriaModel from "../models/CategoriaModel"

export async function listarCategorias() {
  return await CategoriaModel.find().exec()
}

export async function obterCategoria(id) {
  return await CategoriaModel.findById(id).exec()
}

export async function criarCategoria(input) {
  return await CategoriaModel.create(input)
}

export async function atualizarCategoria(id: string, categoria) {
  return await CategoriaModel.findByIdAndUpdate(id, categoria, {
    new: true,
  }).exec()
}

export async function deletarCategoria(id) {
  return await CategoriaModel.findByIdAndDelete(id).exec()
}

export async function inserirProdutoEmCategoria(idProduto, idCategoria) {
  const categoria = await CategoriaModel.findById(idCategoria).exec()
  categoria.produtos.push(idProduto)
  return categoria.save()
}

export async function removerProdutoDaCategoria(idProduto: string, idCategoria: string) {
  const categoria = await CategoriaModel.findById(idCategoria).exec()
  const index = categoria.produtos.indexOf(idProduto)
  if(!~index) return categoria

  categoria.produtos.splice(index, 1)
  return await categoria.save()
}