import { isValidCnpj } from '@brazilian-utils/is-valid-cnpj'

export const obrigatorio = (valor: any) => !valor && 'Obrigatório'
export const cnpjValido = (cnpj: string) => !isValidCnpj(cnpj) && 'CNPJ inválido'
