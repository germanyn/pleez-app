import { Schema, model, Document } from 'mongoose';

export const REF_CLIENTE = 'Cliente'

export interface ClienteDoc extends Document {
  nome: string
}

const schema = new Schema({
  nome: String,
});

const clienteModel = model<ClienteDoc>(REF_CLIENTE, schema)
export default clienteModel