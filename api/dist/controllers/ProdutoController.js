"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProdutoModel_1 = __importDefault(require("../models/ProdutoModel"));
const CategoriaController_1 = __importDefault(require("./CategoriaController"));
async function listarProdutos() {
    return ProdutoModel_1.default.find().exec();
}
exports.listarProdutos = listarProdutos;
async function obterProduto(id) {
    return ProdutoModel_1.default.findById(id).exec();
}
exports.obterProduto = obterProduto;
async function criarProduto(input) {
    const produto = await ProdutoModel_1.default.create(input);
    await CategoriaController_1.default.inserirProdutoEmCategoria(produto._id, input.categoria);
    return produto;
}
exports.criarProduto = criarProduto;
async function atualizarProduto(id, produto) {
    return await ProdutoModel_1.default.findByIdAndUpdate(id, produto, {
        new: true,
    }).exec();
}
exports.atualizarProduto = atualizarProduto;
async function deletarProduto(id) {
    const produto = await ProdutoModel_1.default.findById(id).exec();
    const { categoria } = produto.toObject();
    await CategoriaController_1.default.removerProdutoDaCategoria(id, categoria);
    return produto.remove();
}
exports.deletarProduto = deletarProduto;
//# sourceMappingURL=ProdutoController.js.map