import ProdutoModel from "../models/ProdutoModel"

export async function listarProdutos() {
  return ProdutoModel.find({}).exec()
}

export async function obterProduto(id) {
  return ProdutoModel.findById(id).exec()
}

export async function criarProduto(input) {
  const produto = await new ProdutoModel(input).save()
  return produto.toObject()
}

export async function atualizarProduto(id: string, produto) {
  return await ProdutoModel.findByIdAndUpdate(id, produto, {
    new: true,
  }).exec()
}

export async function deletarProduto(id) {
  return await ProdutoModel.findByIdAndDelete(id).exec()
}