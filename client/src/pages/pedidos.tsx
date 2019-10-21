import React from 'react'
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Theme,
  ListItemIcon,
} from '@material-ui/core';
import { useQuery, useMutation } from 'react-apollo';
import { makeStyles, createStyles, withTheme } from '@material-ui/styles';
import Icon from '@mdi/react';
import theme from 'theme'
import { Route, RouteProps, Switch, useHistory } from 'react-router';
import { Rota } from 'rotas';
import {
  NavLink as RouterLink,
  LinkProps as RouterLinkProps,
  useLocation,
} from 'react-router-dom';
import { mdiCheckboxBlankCircle } from '@mdi/js';
import { red, yellow, blue } from '@material-ui/core/colors';
import {
  TipoSituacaoDoPedido,
  Pedido,
} from '../../../commons/pedidos/types';
import {
  situacoesDePedido,
} from '../../../commons/pedidos/utils';

interface Props extends RouteProps{
  rotas: {[key:string]: Rota}
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 240,
      display: 'flex',
      flexDirection: 'column',
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
  })
)

const AdapterLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

const ListaDePedidos: React.FunctionComponent<Props> = (props) => {
  const location = useLocation()
  const classes = useStyles()
  const history = useHistory()

  // const { loading, data, error } = useQuery<{pedidos: any[], errors: any}, any>(OBTER_PEDIDOS);
  const { loading, data, error } = {
    data: {
      pedidos: [
        {
          _id: 'sasdbasdb-32-vdab-33-b',
          nome: 'Nome Completo',
          situacao: 'recebido',
          itens: [],
        },
        {
          _id: 'sasdbasdb-32-vdab-33-c',
          nome: 'Nome Completo',
          situacao: 'em-preparo',
          itens: [],
        },
        {
          _id: 'sasdbasdb-32-vdab-33-d',
          nome: 'Nome Completo',
          situacao: 'finalizado',
          itens: [],
        },
      ] as Pedido[],
      errors: null,
    },
    loading: false,
    error: null,
  }
  
  const IconeDaSituacaoDoPedido = (props:{
    situacao: TipoSituacaoDoPedido,
  }) => {
    switch(props.situacao) {
      case 'em-preparo':
        return <Icon
          size={1}
          path={mdiCheckboxBlankCircle}
          color={yellow[500]}
        />
      case 'finalizado':
        return <Icon
          size={1}
          path={mdiCheckboxBlankCircle}
          color={blue[500]}
        />
      default:
        return <Icon
          size={1}
          path={mdiCheckboxBlankCircle}
          color={red[500]}
        />
    }
  }

  if (loading) return <div>Carregando...</div>
  if (error) return <div>{ error }</div>
  if (!data) return <div>Sem dados...</div>
  if (data.errors) return <div>{
    data.errors
  }</div>
  
  return (
    <div style={{
      display: 'flex',
      flex: 1,
    }}>
      <Box
        m={1}
        className={ classes.root }
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Pedidos
        </Typography>
        <List style={{
          flex:1,
        }}>
          {data.pedidos.map(pedido=>
            <ListItem
              button
              key={pedido._id}
              component={AdapterLink as any}
              to={`/pedidos/${pedido._id}`}
              selected={ location.pathname === `/cardapio/pedidos/${pedido._id}` }
            >
              <ListItemText
                color="primary"
                primary={pedido.nome}
              />
              <ListItemIcon
                style={{
                  justifyContent: 'flex-end',
                }}
              >
                <IconeDaSituacaoDoPedido
                  situacao={pedido.situacao}
                />
              </ListItemIcon>
            </ListItem>
          )}
        </List>
        <Box mx={1}>
          {
            situacoesDePedido.map((situacao)=>
              <div
                key={situacao.tipo}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignContent: 'space-between',
                }}
              >
                <IconeDaSituacaoDoPedido
                  situacao={situacao.tipo}
                />
                <div style={{ flex: 1, paddingLeft: theme.spacing(1) }}> { situacao.descricao } </div>
              </div>
          )}
        </Box>
      </Box>
      <Divider orientation="vertical" />
      <Switch>
        {props.rotas && Object.entries(props.rotas).map(([key, rota])=>
          <Route
            key={key}
            path={rota.path}
            render={props => (
              <rota.componente
                {...props}
                rotas={rota.path}
              />
            )}
          />
        )}
        />
        <Route exact path={props.path}>
          <Box m={1} >
            Selecione um pedido
          </Box>
        </Route>
      </Switch>
    </div>
  )
}

export default withTheme(ListaDePedidos)