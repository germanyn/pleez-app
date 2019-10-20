import { hash, compare } from "bcryptjs";
import RestauranteModel from "../models/RestauranteModel";
import { sign } from "jsonwebtoken";

export async function logarRestaurante(email: string, senha: string){
  const restaurante = await RestauranteModel.findOne({ email });
  if (!restaurante) {
    throw new Error('Restaurante não existe!');
  }
  const isEqual = await compare(senha, restaurante.senha);
  if (!isEqual) {
    throw new Error('Password está incorreto!');
  }
  const token = sign(
    { idRestaurante: restaurante.id, email },
    'somesupersecretkey'
  );
  return {
    restaurante: restaurante.id,
    token: token
  }
}

export async function registrarRestaurante(input: RegistroRestaurante){
  const existingUser = await RestauranteModel.findOne({ email: input.email });
  if (existingUser) {
    throw 'Restaurante já existe.'
  }
  await RestauranteModel.create({
    ...input,
    bloqueado: true,
    senha: await hash(input.senha,12)
  })
	return {
    ...await logarRestaurante(input.email, input.senha)
  }
}

interface RegistroRestaurante {
  _id: string
  nome: string
  cnpj: string
  email: string
  senha: string  
}