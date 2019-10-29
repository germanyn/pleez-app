"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RestauranteModel_1 = __importDefault(require("../models/RestauranteModel"));
async function listarRestaurantes() {
    return RestauranteModel_1.default.find().exec();
}
exports.listarRestaurantes = listarRestaurantes;
async function obterRestaurante(id) {
    return RestauranteModel_1.default.findById(id).exec();
}
exports.obterRestaurante = obterRestaurante;
async function criarRestaurante(input) {
    return (await RestauranteModel_1.default.create(input)).toObject();
}
exports.criarRestaurante = criarRestaurante;
async function atualizarRestaurante(id, restaurante) {
    return await RestauranteModel_1.default.findByIdAndUpdate(id, restaurante, {
        new: true,
    }).exec();
}
exports.atualizarRestaurante = atualizarRestaurante;
async function deletarRestaurante(id) {
    return await RestauranteModel_1.default.findByIdAndDelete(id).exec();
}
exports.deletarRestaurante = deletarRestaurante;
//# sourceMappingURL=RestauranteController.js.map