import { ClienteDoc, REF_CLIENTE } from './ClienteModel';
import { ProdutoDoc, ProdutoSchema } from './ProdutoModel';
import { Schema, model, Types, Document } from 'mongoose';

export const REF_PEDIDO = 'Pedido'

export interface ItemDoPedidoDoc extends Document {
  quantidade: number
  produto: ProdutoDoc
}

export interface PedidoDoc extends Document {
  cliente: ClienteDoc['_id']
  data: Date
  situacao: 'recebido' | 'em-preparo' | 'finalizado'
  itens: ItemDoPedidoDoc[]
}

const itemDoPedidoSchema = new Schema({
  quantidade: {
    required: true,
    type: Number,
  },
  produto: ProdutoSchema,
});

const PedidoSchema = new Schema({
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
    enum: [
      'recebido',
      'em-preparo',
      'finalizado',
      'rejeitado',
      'cancelado',
    ],
    default: 'recebido',
  },
  dataHora: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

PedidoSchema.index({
  restaurante: 1,
})

PedidoSchema.index({
  cliente: 1,
})

const PedidoModel = model<PedidoDoc>(REF_PEDIDO, PedidoSchema)
export default PedidoModel