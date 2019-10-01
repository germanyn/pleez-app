import ProdutoModel from "../models/ProdutoModel"
import { obterCategoria, inserirProdutoEmCategoria } from "./CategoriaController"

export async function listarProdutos() {
  return ProdutoModel.find().exec()
}

export async function obterProduto(id) {
  return ProdutoModel.findById(id).exec()
}

export async function criarProduto(input) {
  const produto = await ProdutoModel.create(input)
  await inserirProdutoEmCategoria(produto._id, input.categoria)
  return produto
}

export async function atualizarProduto(id: string, produto) {
  return await ProdutoModel.findByIdAndUpdate(id, produto, {
    new: true,
  }).exec()
}

export async function deletarProduto(id) {
  return await ProdutoModel.findByIdAndDelete(id).exec()
}