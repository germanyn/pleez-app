"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CategoriaModel_1 = require("./CategoriaModel");
const mongoose_1 = require("mongoose");
const is_valid_cnpj_1 = require("@brazilian-utils/is-valid-cnpj");
exports.REF_RESTAURANTE = 'Restaurante';
const schema = new mongoose_1.Schema({
    nome: {
        required: true,
        type: String,
    },
    categorias: [{
            type: mongoose_1.Types.ObjectId,
            ref: CategoriaModel_1.REF_CATEGORIA,
        }],
    cnpj: {
        required: true,
        type: String,
        validate: [
            is_valid_cnpj_1.isValidCnpj,
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
exports.default = mongoose_1.model(exports.REF_RESTAURANTE, schema);
//# sourceMappingURL=RestauranteModel.js.map