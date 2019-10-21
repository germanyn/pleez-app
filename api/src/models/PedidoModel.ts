import { situacoesDePedidoDictionary } from './../../../commons/pedidos/utils';
import { ClienteDoc, REF_CLIENTE } from './ClienteModel';
import { ProdutoDoc, ProdutoSchema } from './ProdutoModel';
import { Schema, model, Types, Document } from 'mongoose';

export const REF_PEDIDO = 'Pedido'

export interface ItemDoPedidoDoc extends Document {
  quantidade: number
  produto: ProdutoDoc
  precoTotal: number
}

export interface PedidoDoc extends Document {
  cliente: ClienteDoc['_id']
  data: Date
}

const itemDoPedidoSchema = new Schema({
  quantidade: {
    required: true,
    type: Number,
  },
  produto: ProdutoSchema,
});

const pedidoSchema = new Schema({
  restaurante: {
    type: Types.ObjectId,
    required: true,
  },
  cliente: {
    type: Types.ObjectId,
    ref: REF_CLIENTE,
  },
  itens: [itemDoPedidoSchema],
  situacao: {
    type: String,
    required: true,
    enum: Object.keys(situacoesDePedidoDictionary),
    default: 'recebido',
  }
});

const pedidoModel = model<PedidoDoc>(REF_PEDIDO, pedidoSchema)
export default pedidoModel