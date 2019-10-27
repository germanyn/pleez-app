import PedidoModel from "../models/PedidoModel"
import GenericController from "../shareds/GenericController"
import ProdutoModel from "../models/ProdutoModel"

class PedidoController extends GenericController<typeof PedidoModel> {
  constructor() {
    super(PedidoModel)
  }
  
  async criar(input) {
    return this.model.create({
      ...input,
      itens: await Promise.all(input.itens.map(async item=>({
        ...item,
        produto: await ProdutoModel.findById(item.produto),
      })))
    })
  }
}

export default new PedidoController()