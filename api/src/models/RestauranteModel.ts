import { REF_CATEGORIA, CategoriaDoc } from './CategoriaModel';
import { Schema, model, Types, Document } from 'mongoose';

export const REF_RESTAURANTE = 'Restaurante'

export interface RestauranteDoc extends Document {
  _id: string
  nome: string
  categorias: CategoriaDoc[ '_id'][]
}

const schema = new Schema({
  nome: {
    required: true,
    type: String,
  },
  categorias: [{
    type: Types.ObjectId,
    ref: REF_CATEGORIA,
  }]
});

export default model<RestauranteDoc>(REF_RESTAURANTE, schema)