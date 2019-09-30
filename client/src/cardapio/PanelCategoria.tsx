import React from 'react'
import { createStyles, ExpansionPanel, ExpansionPanelSummary, makeStyles, Theme, Typography, ExpansionPanelDetails, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core';
import RowProduto, { Produto } from './RowProduto';
import Icon from '@mdi/react';
import { mdiChevronDown, mdiPlus } from '@mdi/js';
import theme from 'theme';
import DialogProduto, { ProdutoInput } from './DialogProduto';

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
}

const PanelCategoria = ({ categoria, onAtualizarCategoria }: Props) => {
  const classes = useStyles();

  const ListaVazia = () => (
    <TableRow>
      <TableCell colSpan={3} className={classes.semProduto}>
        Nenhum produto adicionado...
      </TableCell>
    </TableRow>
  )

  const incluirProduto = ({preco, ...produto}:  Required<ProdutoInput>) => {
    onAtualizarCategoria && onAtualizarCategoria({
      ...categoria,
      produtos: [
        ...categoria.produtos,
        {
          id: Math.floor(Math.random()*1000),
          preco: parseFloat(preco),
          ...produto,
        }
      ]
    })
  }

  return (
    <ExpansionPanel>
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
                key = { produto.id }
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
  _id: string | number
  nome: string
  produtos: Produto[]
}

export default PanelCategoria