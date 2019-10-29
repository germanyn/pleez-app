"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const RestauranteModel_1 = __importDefault(require("../models/RestauranteModel"));
const jsonwebtoken_1 = require("jsonwebtoken");
async function logarRestaurante(email, senha) {
    const restaurante = await RestauranteModel_1.default.findOne({ email });
    if (!restaurante) {
        throw new Error('Restaurante não existe!');
    }
    const isEqual = await bcryptjs_1.compare(senha, restaurante.senha);
    if (!isEqual) {
        throw new Error('Password está incorreto!');
    }
    const token = jsonwebtoken_1.sign({ idRestaurante: restaurante.id, email }, 'somesupersecretkey');
    return {
        restaurante: restaurante.id,
        token: token
    };
}
exports.logarRestaurante = logarRestaurante;
async function registrarRestaurante(input) {
    const existingUser = await RestauranteModel_1.default.findOne({ email: input.email });
    if (existingUser) {
        throw 'Restaurante já existe.';
    }
    await RestauranteModel_1.default.create({
        ...input,
        bloqueado: true,
        senha: await bcryptjs_1.hash(input.senha, 12)
    });
    return {
        ...await logarRestaurante(input.email, input.senha)
    };
}
exports.registrarRestaurante = registrarRestaurante;
//# sourceMappingURL=AuthController.js.map