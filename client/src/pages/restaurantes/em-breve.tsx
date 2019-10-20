import React from 'react'
import { Container } from "@material-ui/core"
import rotas from 'rotas'

export default function EmBreve () {
  return (
    <Container>
      <h2>EM BREVE</h2>
      <div>Estamos em testes mas ansiosos para trabalhar com você! ; ) </div>
      <div>Caso queira participar ou tirar dúvidas, envie um e-mail para contato@pleez.com.br</div>
      <a onClick={
        ()=>window.location.assign(rotas.login.path)
      }>Voltar para o login.</a>
    </Container>
  )
}