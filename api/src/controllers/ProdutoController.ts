import { CriarProdutoInput, AtualizarProdutoInput } from "../../../types/Produto"
import ProdutoModel from "../models/ProdutoModel"

export async function criarProduto(input: CriarProdutoInput) {
  const produto = await new ProdutoModel(input).save()
  return produto.toObject()
}

export async function listarProdutos() {
  return ProdutoModel.find({}).exec()
}

export async function atualizarProduto(id: string, produto: AtualizarProdutoInput) {
  return await ProdutoModel.findByIdAndUpdate(id, produto, {
    new: true,
  }).exec()
}

export async function deletarProduto(id) {
  return await ProdutoModel.findByIdAndDelete(id).exec()
}