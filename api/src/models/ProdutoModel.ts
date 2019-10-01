import { CategoriaDoc } from './CategoriaModel';
import { Schema, model, Types, Document } from 'mongoose';

export const REF_PRODUTO = 'Produto'

export interface ProdutoDoc extends Document {
  _id: string
  nome: string
  descricao?: string
  categoria: CategoriaDoc['_id']
}

const schema = new Schema({
  nome: {
    required: true,
    type: String,
  },
  descricao: String,
  preco: {
    required: true,
    type: Types,
  }
});

export default model<ProdutoDoc>(REF_PRODUTO, schema)

import('./CategoriaModel').then(({REF_CATEGORIA})=>{
  schema.add({
    categoria: {
      required: true,
      type: Types.ObjectId,
      ref: REF_CATEGORIA,
    }
  })
})