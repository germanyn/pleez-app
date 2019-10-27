import { Model } from 'mongoose';
export default class GenericController<T extends typeof Model> {
  model: T
  
  constructor(model: T) {
    this.model = model
  }
  
  listar(filtros: { [field: string]: string | string[] } = {}) {
    const conditions = Object
      .entries(filtros)
      .reduce(({...query}, [campo, valor])=>{
        Array.isArray(campo)
          ? query[campo] = {
            $in: valor
          }
          : query[campo]=valor
        return query
      }, {})
    return this.model.find(conditions).exec()
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