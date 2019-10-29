"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PedidoModel_1 = __importDefault(require("../models/PedidoModel"));
const GenericController_1 = __importDefault(require("../shareds/GenericController"));
const ProdutoModel_1 = __importDefault(require("../models/ProdutoModel"));
class PedidoController extends GenericController_1.default {
    constructor() {
        super(PedidoModel_1.default);
    }
    async criar(input) {
        return this.model.create({
            ...input,
            itens: await Promise.all(input.itens.map(async (item) => ({
                ...item,
                produto: await ProdutoModel_1.default.findById(item.produto),
            })))
        });
    }
}
exports.default = new PedidoController();
//# sourceMappingURL=PedidoController.js.map