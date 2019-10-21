import PedidoModel from "../models/PedidoModel"
import GenericController from "../shareds/GenericController"

class PedidoController extends GenericController<typeof PedidoModel> {
  constructor() {
    super(PedidoModel)
  }
  
  criar(input) {
    return this.model.create(input)
  }
}

export default new PedidoController()