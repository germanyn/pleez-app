import React from 'react'
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Theme,
} from '@material-ui/core';
import { useQuery, useMutation } from 'react-apollo';
import { OBTER_CATEGORIAS } from 'graphql/queries/categoria';
import { CRIAR_CATEGORIA } from 'graphql/mutations/categoria';
import DialogCategoria, { CategoriaInput } from 'components/modules/categorias/DialogCategoria';
import { makeStyles, createStyles, withTheme } from '@material-ui/styles';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import theme from 'theme'
import { Route, RouteProps, Switch, useHistory } from 'react-router';
import { Rota } from 'rotas';
import {
  NavLink as RouterLink,
  LinkProps as RouterLinkProps,
  useLocation,
} from 'react-router-dom';
import { red } from '@material-ui/core/colors';

interface Props extends RouteProps{
  rotas: {[key:string]: Rota}
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    categorias: {
      width: 240,
      display: 'flex',
      flexDirection: 'column',
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    selected: {
      backgroundColor: theme.palette.primary.light,
      text: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: red[100],
      }
    },
  })
)

const AdapterLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

const Cardapio: React.FunctionComponent<Props> = (props) => {
  const location = useLocation()
  const classes = useStyles()
  const history = useHistory()

  const { loading, data, error } = useQuery<{categorias: Categoria[], errors: any}, any>(OBTER_CATEGORIAS);
  
  const [ criarCategoria ] = useMutation(CRIAR_CATEGORIA, {
    update(cache, { data: { criarCategoria } }) {
      const data = cache.readQuery<{categorias: Categoria[]}>({
        query: OBTER_CATEGORIAS
      });
      if (!data) return
      const { categorias } = data;
      cache.writeQuery({
        query: OBTER_CATEGORIAS,
        data: { categorias: categorias.concat([criarCategoria]) },
      });
    }
  })

  const adicionarCategoria = async (categoria: CategoriaInput) => { 
    const { data } = await criarCategoria({
      variables: {
        input: {
          ...categoria,
        }
      }
    })
    history.push(`/cardapios/categorias/${data.criarCategoria._id}`)
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
        className={ classes.categorias }
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Categorias
        </Typography>
        <Divider />
        <List style={{
          flex:1,
        }}>
          {data.categorias.map(categoria=>
            <ListItem
              button
              key={categoria._id}
              component={AdapterLink as any}
              to={`/cardapios/categorias/${categoria._id}`}
              selected={ location.pathname === `/cardapios/categorias/${categoria._id}` }
            >
              <ListItemText
                color="primary"
                primary={categoria.nome}
              />
            </ListItem>
          )}
        </List>
        <DialogCategoria onConfirma={adicionarCategoria}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            size="medium"
          >
            Adicionar Categoria
            <Icon
              className={classes.rightIcon}
              path={mdiPlus}
              size={1}
              color={theme.palette.primary.contrastText}
            />
          </Button>
        </DialogCategoria>
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
            Selecione uma categoria
          </Box>
        </Route>
      </Switch>
    </div>
  )
}

export default withTheme(Cardapio)