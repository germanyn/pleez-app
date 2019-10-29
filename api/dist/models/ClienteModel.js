"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.REF_CLIENTE = 'Cliente';
const schema = new mongoose_1.Schema({
    nome: String,
});
const ClienteModel = mongoose_1.model(exports.REF_CLIENTE, schema);
exports.default = ClienteModel;
//# sourceMappingURL=ClienteModel.js.map