"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClienteModel_1 = require("./ClienteModel");
const ProdutoModel_1 = require("./ProdutoModel");
const mongoose_1 = require("mongoose");
exports.REF_PEDIDO = 'Pedido';
const itemDoPedidoSchema = new mongoose_1.Schema({
    quantidade: {
        required: true,
        type: Number,
    },
    produto: ProdutoModel_1.ProdutoSchema,
});
const PedidoSchema = new mongoose_1.Schema({
    restaurante: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    cliente: {
        type: mongoose_1.Types.ObjectId,
        ref: ClienteModel_1.REF_CLIENTE,
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
});
PedidoSchema.index({
    cliente: 1,
});
const PedidoModel = mongoose_1.model(exports.REF_PEDIDO, PedidoSchema);
exports.default = PedidoModel;
//# sourceMappingURL=PedidoModel.js.map