import React, { forwardRef } from 'react'
import { TableCell, TableRow, Table, TableHead, TableBody, Button } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiPlus } from '@mdi/js'
import theme from 'theme'
import RowDoProduto from './components/RowDoProduto'
import NenhumProduto from './components/RowNenhumProduto'
import DialogProduto, { ProdutoInput } from 'components/modules/produtos/DialogProduto'

const TableDeProdutos: React.ComponentType<Props> = ({
  produtos,
  onIncluirProduto,
  onProdutoEditado,
  onExcluirProduto,
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Produto</TableCell>
          <TableCell>Preço</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { produtos.length
          ? produtos.map(produto => 
            <RowDoProduto
              key = { produto._id }
              produto = { produto }
              onProdutoEditado = { (produtoInput) =>
                onProdutoEditado && onProdutoEditado(
                  produto._id,
                  produtoInput
                )
              }
              onExcluirProduto = {
                () => onExcluirProduto && onExcluirProduto(produto._id)
              }
            />
          )
          : <NenhumProduto/>
        }
        <TableRow>
          <TableCell colSpan={3}>
            <DialogProduto onConfirma={
              (produtoInput) => onIncluirProduto && onIncluirProduto(produtoInput)
            }>
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
  )
}

export default TableDeProdutos

export type Props = {
  produtos: Produto[]
  onIncluirProduto?: ((produtoInput: Required<ProdutoInput>) => void) | undefined
  onProdutoEditado?: ((id: string, produtoInput: Required<ProdutoInput>) => void) | undefined
  onExcluirProduto?: ((id: string) => void) | undefined
}