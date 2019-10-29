"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoriaModel_1 = __importDefault(require("../models/CategoriaModel"));
const GenericController_1 = __importDefault(require("../shareds/GenericController"));
class CategoriaController extends GenericController_1.default {
    async inserirProdutoEmCategoria(idProduto, idCategoria) {
        const categoria = await CategoriaModel_1.default.findById(idCategoria).exec();
        categoria.produtos.push(idProduto);
        return categoria.save();
    }
    async trocarOrdemProdutos(idCategoria, indiceA, indiceB) {
        const categoria = await CategoriaModel_1.default
            .findById(idCategoria)
            .select('produtos')
            .exec();
        [categoria.produtos[indiceA], categoria.produtos[indiceB]] =
            [categoria.produtos[indiceB], categoria.produtos[indiceA]];
        const result = await categoria.update({
            produtos: categoria.produtos,
        });
    }
    async removerProdutoDaCategoria(idProduto, idCategoria) {
        const categoria = await CategoriaModel_1.default.findById(idCategoria).exec();
        const index = categoria.produtos.indexOf(idProduto);
        if (!~index)
            return categoria;
        categoria.produtos.splice(index, 1);
        return await categoria.save();
    }
}
exports.default = new CategoriaController(CategoriaModel_1.default);
//# sourceMappingURL=CategoriaController.js.map