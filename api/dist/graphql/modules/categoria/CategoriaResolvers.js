"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoriaController_1 = __importDefault(require("../../../controllers/CategoriaController"));
const ProdutoResolvers_1 = require("../produto/ProdutoResolvers");
exports.default = {
    Query: {
        categoria: async (root, { id }) => exports.getCategoria(id),
        categorias: async () => (await CategoriaController_1.default.listar()).map(categoriaGetter),
    },
    Mutation: {
        criarCategoria: async (root, input) => {
            return CategoriaController_1.default.criar(input.categoria).then(categoriaGetter);
        },
        atualizarCategoria: async (root, input) => {
            return CategoriaController_1.default.atualizar(input.id, input.categoria).then(categoriaGetter);
        },
        deletarCategoria: async (root, input) => {
            return CategoriaController_1.default.deletar(input.id).then(categoriaGetter);
        },
        trocarOrdemProdutosDaCategoria: async (root, { idCategoria, indiceA, indiceB }) => {
            await CategoriaController_1.default.trocarOrdemProdutos(idCategoria, indiceA, indiceB);
            return {
                indiceA,
                indiceB,
            };
        }
    }
};
exports.getCategoria = async (id) => {
    const categoria = (await CategoriaController_1.default.obter(id));
    return categoriaGetter(categoria);
};
function categoriaGetter(categoria) {
    const obj = categoria.toObject();
    const resolver = {
        ...obj,
    };
    Object.defineProperty(resolver, 'produtos', {
        async get() {
            return obj.produtos.map(ProdutoResolvers_1.getProduto);
        }
    });
    return resolver;
}
exports.categoriaGetter = categoriaGetter;
//# sourceMappingURL=CategoriaResolvers.js.map