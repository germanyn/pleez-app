import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PanelCategoria, { Categoria } from './PanelCategoria';
import DialogCategoria from './DialogCategoria';
import { useQuery, useMutation } from "react-apollo";
import {
  CRIAR_CATEGORIA,
} from 'graphql/mutations'
import { OBTER_CATEGORIAS } from 'graphql/queries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
  }),
);

export default function ListaCardapioAdmin() {
  const classes = useStyles();
  const [ categorias, setCategorias ] = useState<Categoria[]>([])
  const [ expanded, setExpanded ] = useState<string | undefined>(undefined)
  const { loading, data, error } = useQuery<{categorias: Categoria[]}, any>(
    OBTER_CATEGORIAS
  );
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

  const adicionarCategoria = async (nome: string) => { 
    const { data } = await criarCategoria({
      variables: {
        input: {
          nome,
        }
      }
    })
    console.log({data})
    setExpanded(data.criarCategoria._id)
  }

  if (loading) return <div>Carregando...</div>
  if (error) return <div>{ error }</div>
  if (!data) return <div>Sem dados...</div>

  return (
    <Paper className={classes.root}>
      <React.Fragment>
        { data.categorias.map(categoria =>
          <PanelCategoria
            categoria = { categoria }
            key = { categoria._id }
            expanded = { categoria._id === expanded }
            onExpand = { (id) => setExpanded(id === expanded ? undefined : id) }
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