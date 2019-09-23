import { REF_CATEGORIA } from './CategoriaModel';
import { Schema, model, Types, Document } from 'mongoose';
import Restaurante from '../../../types/Restaurante';

export const REF_RESTAURANTE = 'Restaurante'

export interface RestauranteDoc extends Restaurante, Document {}

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