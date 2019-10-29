"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.REF_PRODUTO = 'Produto';
const schema = new mongoose_1.Schema({
    nome: {
        required: true,
        type: String,
    },
    descricao: String,
    preco: {
        required: true,
        type: mongoose_1.Types,
    },
});
exports.ProdutoSchema = schema;
const ProdutoModel = mongoose_1.model(exports.REF_PRODUTO, schema);
exports.default = ProdutoModel;
Promise.resolve().then(() => __importStar(require('./CategoriaModel'))).then(({ REF_CATEGORIA }) => {
    schema.add({
        categoria: {
            required: true,
            type: mongoose_1.Types.ObjectId,
            ref: REF_CATEGORIA,
        }
    });
});
//# sourceMappingURL=ProdutoModel.js.map