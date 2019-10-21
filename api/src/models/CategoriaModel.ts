import { REF_RESTAURANTE, RestauranteDoc } from './RestauranteModel';
import { REF_PRODUTO, ProdutoDoc } from './ProdutoModel';
import { Schema, model, Types, Document } from 'mongoose';

export const REF_CATEGORIA = 'Categoria'

export interface CategoriaDoc extends Document {
  nome: string
  produtos: ProdutoDoc['_id'][]
  restaurante: RestauranteDoc['_id']
}

const schema = new Schema({
  nome: {
    required: true,
    type: String,
  },
  produtos: [{
    type: Types.ObjectId,
    ref: REF_PRODUTO,
  }],
  restaurante: {
    // required: true,
    type: Types.ObjectId,
    ref: REF_RESTAURANTE,
  },
});

export default model<CategoriaDoc>(REF_CATEGORIA, schema)