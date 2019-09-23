import { REF_RESTAURANTE } from './RestauranteModel';
import { REF_PRODUTO } from './ProdutoModel';
import { Schema, model, Types, Document } from 'mongoose';
import Categoria from '../../../types/Categoria';

export const REF_CATEGORIA = 'Categoria'

export interface CategoriaDoc extends Categoria, Document {}

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
    required: true,
    type: Types.ObjectId,
    ref: REF_RESTAURANTE,
  },
});

export default model<CategoriaDoc>(REF_CATEGORIA, schema)