import CategoriaModel from "../models/CategoriaModel"
import GenericController from "../shareds/GenericController"

class CategoriaController extends GenericController<typeof CategoriaModel> {

  async inserirProdutoEmCategoria(idProduto, idCategoria) {
    const categoria = await CategoriaModel.findById(idCategoria).exec()
    categoria.produtos.push(idProduto)
    return categoria.save()
  }
  
  async trocarOrdemProdutos(idCategoria, indiceA, indiceB) {
    const categoria = await CategoriaModel
      .findById(idCategoria)
      .select('produtos')
      .exec()
  
    ;[ categoria.produtos[indiceA], categoria.produtos[indiceB] ] =
    [ categoria.produtos[indiceB], categoria.produtos[indiceA] ]
  
    const result = await categoria.update({
      produtos: categoria.produtos,
    })
  }
  
  async removerProdutoDaCategoria(idProduto: string, idCategoria: string) {
    const categoria = await CategoriaModel.findById(idCategoria).exec()
    const index = categoria.produtos.indexOf(idProduto)
    if(!~index) return categoria
  
    categoria.produtos.splice(index, 1)
    return await categoria.save()
  }
}

export default new CategoriaController(CategoriaModel)