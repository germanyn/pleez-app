import { CategoriaDoc } from './../models/CategoriaModel';
import { Model, model, Document } from 'mongoose';
export default class GenericController<T extends typeof Model> {
  model: T
  
  constructor(model: T) {
    this.model = model
  }
  
  listar() {
    return this.model.find().exec()
  }
  
  obter(id) {
    return this.model.findById(id)
  }

  criar(input) {
    return this.model.create(input)
  }
  
  atualizar(id: string, input) {
    return this.model.findByIdAndUpdate(id, input, {
      new: true,
    })
  }

  deletar(id) {
    return this.model.findByIdAndDelete(id).exec()
  }
}