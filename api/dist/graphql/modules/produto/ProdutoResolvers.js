"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CategoriaResolvers_1 = require("./../categoria/CategoriaResolvers");
const ProdutoController_1 = require("../../../controllers/ProdutoController");
exports.default = {
    Query: {
        produto: async (root, { id }) => exports.getProduto(id),
        produtos: async () => (await ProdutoController_1.listarProdutos()).map(produtoGetter),
    },
    Mutation: {
        criarProduto: async (root, input) => {
            return ProdutoController_1.criarProduto(input.produto).then(produtoGetter);
        },
        atualizarProduto: async (root, input) => {
            return ProdutoController_1.atualizarProduto(input.id, input.produto).then(produtoGetter);
        },
        deletarProduto: async (root, input) => {
            return ProdutoController_1.deletarProduto(input.id).then(produtoGetter);
        }
    }
};
exports.getProduto = async (id) => {
    const produto = (await ProdutoController_1.obterProduto(id));
    return produtoGetter(produto);
};
function produtoGetter(produto) {
    const obj = produto.toObject();
    const resolver = {
        ...obj,
    };
    Object.defineProperty(resolver, 'categoria', {
        async get() {
            return CategoriaResolvers_1.getCategoria(obj.categoria);
        }
    });
    return resolver;
}
exports.produtoGetter = produtoGetter;
//# sourceMappingURL=ProdutoResolvers.js.map