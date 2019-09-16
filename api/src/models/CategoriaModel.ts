import { REF_PRODUTO } from './ProdutoModel';
import { Schema, model, Types } from 'mongoose';

export const REF_CATEGORIA = 'Categoria'

const schema = new Schema({
  nome: {
    required: true,
    type: String,
  },
  produtos: [{
    type: Types.ObjectId,
    ref: REF_PRODUTO,
  }],
});

export default model(REF_CATEGORIA, schema)