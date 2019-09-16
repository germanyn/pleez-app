import { REF_CATEGORIA } from './CategoriaModel';
import { Schema, model, Types, Document } from 'mongoose';
import Produto from '../../../types/Produto';

export const REF_PRODUTO = 'Produto'

interface ProdutoDoc extends Produto, Document {}

const schema = new Schema({
  nome: {
    required: true,
    type: String,
  },
  descricao: String,
  categorias: [{
    type: Types.ObjectId,
    ref: REF_CATEGORIA,
  }]
});

export default model<ProdutoDoc>(REF_PRODUTO, schema)