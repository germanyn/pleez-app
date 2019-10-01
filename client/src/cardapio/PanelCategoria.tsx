import React from 'react'
import { createStyles, ExpansionPanel, ExpansionPanelSummary, makeStyles, Theme, Typography, ExpansionPanelDetails, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core';
import RowProduto, { Produto } from './RowProduto';
import Icon from '@mdi/react';
import { mdiChevronDown, mdiPlus } from '@mdi/js';
import theme from 'theme';
import DialogProduto, { ProdutoInput } from './DialogProduto';
import { useMutation } from 'react-apollo';
import { INCLUIR_PRODUTO_CATEGORIA } from 'graphql/mutations';
import { OBTER_CATEGORIAS } from 'graphql/queries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    semProduto: {
      textAlign: 'center',
      fontStyle: 'italic',
    }
  }),
);


interface Props {
  categoria: Categoria
  onAtualizarCategoria?: (categoria: Categoria) => void
  expanded?: boolean
  onExpand?: (id: string) => void
}

const PanelCategoria = ({
  categoria,
  expanded,
  onExpand,
}: Props) => {
  const classes = useStyles();
  const [ criarMutation ] = useMutation(INCLUIR_PRODUTO_CATEGORIA, {
    update(cache, { data: { criarProduto } }) {
      const data = cache.readQuery<{categorias: Categoria[]}, any>({
        query: OBTER_CATEGORIAS
      })
      if (!data) return
      const { categorias } = data;

      const index = categorias.findIndex(({_id}) => _id === categoria ._id)
      if (!~index) return

      console.log({criarProduto})
      
      const categoriasAtualizadas = [ ...categorias]
      categoriasAtualizadas.splice(index, 1, {
        ...categoria,
        produtos: [
          ...categoria.produtos,
          criarProduto
        ]
      })

      cache.writeQuery({
        query: OBTER_CATEGORIAS,
        data: {
          categorias: categoriasAtualizadas,
        }
      })
    }
  })

  const ListaVazia = () => (
    <TableRow>
      <TableCell colSpan={3} className={classes.semProduto}>
        Nenhum produto adicionado...
      </TableCell>
    </TableRow>
  )

  const incluirProduto = async ({preco, ...produto}:  Required<ProdutoInput>) => {
    await criarMutation({
      variables: {
        produtoInput: {
          ...produto,
          preco: parseFloat(preco),
          categoria: categoria._id,
        }
      }
    })
  }

  return (
    <ExpansionPanel
      expanded = { expanded }
      onChange = { () => onExpand && onExpand(categoria._id) }
    >
      <ExpansionPanelSummary
        expandIcon={<Icon path={mdiChevronDown} size={1} />}
      >
        <Typography className={classes.heading}>{categoria.nome}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoria.produtos.length && categoria.produtos.map(produto => 
              <RowProduto
                key = { produto._id }
                produto = { produto }
              />
            )||<ListaVazia/>}
            <TableRow>
              <TableCell colSpan={3}>
                <DialogProduto
                  onConfirma={ incluirProduto }
                >
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                  >
                    <Icon
                      color={theme.palette.primary.contrastText}
                      path={mdiPlus}
                      size={1}
                    />
                  </Button>
                </DialogProduto>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export interface Categoria {
  _id: string
  nome: string
  produtos: Produto[]
}

export default PanelCategoria