import { mdiHome, mdiKey, mdiAccountGroup, mdiStore, mdiSilverware, mdiArrowBottomLeft, mdiSquareEditOutline } from "@mdi/js";
import Home from 'pages/home';
import EditarCardapio from "pages/cardapio";
import EditarCategoria from "pages/cardapio/categoria";
import ListaDePedidos from "pages/pedidos";
import Pedido from "pages/pedido";
import Login from "pages/login";
import RegistrarRestaurante from "pages/restaurantes/registrar";
import RestauranteBloqueado from "pages/restaurantes/em-breve";
import Restaurante from "pages/restaurante";

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
    icone: mdiSquareEditOutline,
    path: '/restaurantes/registrar',
    componente: RegistrarRestaurante,
  },
  'editar-restaurante': {
    nomeDoMenu: 'Restaurante',
    nome: 'Configurar Restaurante',
    icone: mdiStore,
    path: '/restaurante',
    componente: Restaurante,
  },
  'pedidos': {
    nomeDoMenu: 'Pedidos',
    nome: 'Pedidos',
    icone: mdiArrowBottomLeft,
    path: '/pedidos',
    componente: ListaDePedidos,
    rotas: {
      'pedido': {
        nome: 'DetalhePedido',
        path: '/pedidos/:id',
        componente: Pedido,
      },
    },
  },
  'editar-cardapios': {
    nomeDoMenu: 'Cardápio',
    nome: 'Cardápio',
    icone: mdiSilverware,
    path: '/cardapio',
    componente: EditarCardapio,
    rotas: {
      'editar-categoria': {
        nome: 'EditarCategoria',
        path: '/cardapio/categorias/:id',
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