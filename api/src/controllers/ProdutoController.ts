import ProdutoModel from "../models/ProdutoModel"
import CategoriaController from "./CategoriaController"

export async function listarProdutos() {
  return ProdutoModel.find().exec()
}

export async function obterProduto(id) {
  return ProdutoModel.findById(id).exec()
}

export async function criarProduto(input) {
  const produto = await ProdutoModel.create(input)
  console.log({categoria: input.categoria})
  await CategoriaController.inserirProdutoEmCategoria(produto._id, input.categoria)
  return produto
}

export async function atualizarProduto(id: string, produto) {
  return await ProdutoModel.findByIdAndUpdate(id, produto, {
    new: true,
  }).exec()
}

export async function deletarProduto(id) {
  const produto = await ProdutoModel.findById(id).exec()
  console.log({produto})
  const { categoria } = produto.toObject()
  await CategoriaController.removerProdutoDaCategoria(id, categoria)
  return produto.remove()
}