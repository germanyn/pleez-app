"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericController {
    constructor(model) {
        this.model = model;
    }
    listar(filtros = {}) {
        const conditions = Object
            .entries(filtros)
            .reduce(({ ...query }, [campo, valor]) => {
            Array.isArray(campo)
                ? query[campo] = {
                    $in: valor
                }
                : query[campo] = valor;
            return query;
        }, {});
        return this.model.find(conditions).exec();
    }
    obter(id) {
        return this.model.findById(id);
    }
    criar(input) {
        return this.model.create(input);
    }
    atualizar(id, input) {
        return this.model.findByIdAndUpdate(id, input, {
            new: true,
        });
    }
    deletar(id) {
        return this.model.findByIdAndDelete(id).exec();
    }
}
exports.default = GenericController;
//# sourceMappingURL=GenericController.js.map