import { mdiHome, mdiKey, mdiAccountGroup, mdiStore, mdiSilverware } from "@mdi/js";
import Home from 'pages/home';
import EditarCardapio from "pages/cardapio/editar";
import EditarCategoria from "pages/cardapio/categoria";
import Login from "pages/login";
import RegistrarRestaurante from "pages/restaurantes/registrar";
import RestauranteBloqueado from "pages/restaurantes/em-breve";

export default {
  'home': {
    nomeDoMenu: 'Home',
    nome: 'Home',
    icone: mdiHome,
    path: '/',
    componente: Home,
  },
  'login': {
    nomeDoMenu: 'Login',
    nome: 'Login do Restaurante',
    icone: mdiKey,
    path: '/restaurantes/login',
    componente: Login,
  },
  'restaurante-bloqueado': {
    nome: 'Em Breve',
    path: '/restaurantes/em-breve',
    componente: RestauranteBloqueado,
  },
  'registrar-restaurante': {
    nomeDoMenu: 'Cadastrar',
    nome: 'Cadastro de Restaurante',
    icone: mdiStore,
    path: '/restaurantes/registrar',
    componente: RegistrarRestaurante,
  },
  // 'restaurante': {
  //   nome: 'Restaurante',
  //   icone: mdiAccountGroup,
  //   path: '/restaurantes/:id',
  //   componente: null,
  // },
  'editar-cardapios': {
    nomeDoMenu: 'Cardápio',
    nome: 'Edição do Cardápio',
    icone: mdiSilverware,
    path: '/cardapios',
    componente: EditarCardapio,
    rotas: {
      'editar-categoria': {
        nome: 'EditarCategoria',
        path: '/cardapios/categorias/:id',
        componente: EditarCategoria,
      },
    },
  },
} as {[key:string]: Rota}

export type Rota = {
  nomeDoMenu?: string
  nome: string
  path: string
  componente: any
  icone?: string
  rotas?: {[key:string]: Rota}
}