import history from 'app-history'
import rotas from "rotas"

export const TOKEN_REF = 'authToken'

export const setAuthToken = (token: string) => localStorage.setItem(TOKEN_REF, token)
export const getAuthToken = () => localStorage.getItem(TOKEN_REF)
export const clearAuthToken = () => localStorage.removeItem(TOKEN_REF)
export const isAuth = () => !!getAuthToken()

type LogarParams = {
  token: string,
  restaurante: {
    bloqueado: boolean
    _id: string
  }
}
export function logar({
  token,
  restaurante: {
    bloqueado
  }
}: LogarParams) {
  if (bloqueado) {
    history.push(rotas['restaurante-bloqueado'].path)
    return
  }
  setAuthToken(token)
  history.push(rotas['editar-cardapios'].path)
}