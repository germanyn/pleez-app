import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PanelCategoria, { Categoria } from './PanelCategoria';
import DialogCategoria from './DialogCategoria';
import { Query, useQuery } from "react-apollo";
import gql from "graphql-tag";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
  }),
);

const BUSCA_CATEGORIAS_ADMIN = gql`
  query BuscarCategoriasAdmin {
    categorias {
      _id
      nome
      produtos {
        _id
        nome
        preco
      }
    }
  }
`

export default function ListaCardapioAdmin() {
  const classes = useStyles();

  const atualizarCategoria = (categoria: Categoria) => {
    const categoriasAtualizadas = [ ...categorias ]
    const index = categoriasAtualizadas.findIndex(({_id}) => _id === categoria._id)
    if(!~index) return
    categoriasAtualizadas.splice(index, 1, categoria)
    setCategorias(categoriasAtualizadas)
  }
  
  const { loading, data, error } = useQuery<{categorias: Categoria[]}, any>(
    BUSCA_CATEGORIAS_ADMIN
  );

  if (loading) return <div>Carregando...</div>
  if (error) return <div>{ error }</div>

  const [ categorias, setCategorias ] = useState(data ? data.categorias : [])

  function adicionarCategoria(nome: string) {
    setCategorias([
      ...categorias,
      {
        _id: Math.floor(Math.random()*1000),
        nome,
        produtos: [],
      }
    ])
  }

  return (
    <Paper className={classes.root}>
      <React.Fragment>
        { categorias.map(categoria =>
        <PanelCategoria
          categoria = { categoria }
          key = { categoria._id }
          onAtualizarCategoria = { atualizarCategoria }
          />
          ) }
        <DialogCategoria
          onConfirma ={ adicionarCategoria }
        />
      </React.Fragment>
    </Paper>
  );
}

// const categoriasIniciais: Categoria[] = [
//   {
//     id: 1,
//     nome: 'Entradas',
//     produtos: [
//       {
//         id: 5,
//         nome: 'Springdream',
//         preco: 23.90,
//       },
//       {
//         id: 6,
//         nome: 'Pigmeu & Julieta',
//         preco: 14.90,
//       },
//       {
//         id: 7,
//         nome: 'Glu-glu, Yeah, Yeah',
//         preco: 21.90,
//       },
//     ]
//   },
//   {
//     id: 2,
//     nome: 'Sanduíches',
//     produtos: [
//       {
//         id: 8,
//         nome: 'Pork & Cheese',
//         preco: 32.90,
//       },
//       {
//         id: 9,
//         nome: 'Pigmeu & Julieta',
//         preco: 33.90,
//       },
//     ]
//   },
//   {
//     id: 3,
//     nome: 'Hamburgueres',
//     produtos: [],
//   },
//   {
//     id: 4,
//     nome: 'Porções',
//     produtos: [],
//   },
// ]