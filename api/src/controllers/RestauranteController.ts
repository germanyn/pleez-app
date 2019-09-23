import { Categoria } from './../types/graphql';
import RestauranteModel from "../models/RestauranteModel"

export async function listarRestaurantes() {
  return RestauranteModel.find().exec()
}

export async function obterRestaurante(id) {
  return RestauranteModel.findById(id).exec()
}

export async function criarRestaurante(input) {
  return (await RestauranteModel.create(input)).toObject()
}

export async function atualizarRestaurante(id: string, restaurante) {
  return await RestauranteModel.findByIdAndUpdate(id, restaurante, {
    new: true,
  }).exec()
}

export async function deletarRestaurante(id) {
  return await RestauranteModel.findByIdAndDelete(id).exec()
}