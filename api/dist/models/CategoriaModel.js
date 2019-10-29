"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RestauranteModel_1 = require("./RestauranteModel");
const ProdutoModel_1 = require("./ProdutoModel");
const mongoose_1 = require("mongoose");
exports.REF_CATEGORIA = 'Categoria';
const schema = new mongoose_1.Schema({
    nome: {
        required: true,
        type: String,
    },
    produtos: [{
            type: mongoose_1.Types.ObjectId,
            ref: ProdutoModel_1.REF_PRODUTO,
        }],
    restaurante: {
        // required: true,
        type: mongoose_1.Types.ObjectId,
        ref: RestauranteModel_1.REF_RESTAURANTE,
    },
});
exports.default = mongoose_1.model(exports.REF_CATEGORIA, schema);
//# sourceMappingURL=CategoriaModel.js.map