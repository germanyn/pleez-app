"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GenericController_1 = __importDefault(require("../shareds/GenericController"));
const ClienteModel_1 = __importDefault(require("../models/ClienteModel"));
exports.default = new GenericController_1.default(ClienteModel_1.default);
//# sourceMappingURL=ClienteController.js.map