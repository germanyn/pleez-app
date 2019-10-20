import { REF_CATEGORIA, CategoriaDoc } from './CategoriaModel';
import { Schema, model, Types, Document } from 'mongoose';
import { isValidCnpj } from '@brazilian-utils/is-valid-cnpj'

export const REF_RESTAURANTE = 'Restaurante'

export interface RestauranteDoc extends Document {
  _id: string
  nome: string
  cnpj: string
  senha: string
  bloqueado: boolean
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
  }],
  cnpj: {
    required: true,
    type: String,
    validate: [
      isValidCnpj,
      'CNPJ inválido.',
    ],
  },
  telefone: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  senha: {
    required: true,
    type: String,
  },
  bloqueado: {
    default: true,
    type: Boolean,
  },
});

export default model<RestauranteDoc>(REF_RESTAURANTE, schema)