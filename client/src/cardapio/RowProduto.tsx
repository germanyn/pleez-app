import React from 'react'
import { TableCell, IconButton, TableRow } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiPencilOutline, mdiDeleteOutline } from '@mdi/js'
import { formatarPreco } from 'utils'

const AcoesCell = () =>
  <TableCell style={{ width: '1%', whiteSpace: 'nowrap' }}>
    <IconButton>
      <Icon path={mdiPencilOutline} size={1} />
    </IconButton>
    <IconButton>
      <Icon path={mdiDeleteOutline} size={1} />
    </IconButton>
  </TableCell>


interface Props {
  produto: Produto
}

const RowProduto = ({ produto }: Props) => (
  <TableRow>
    <TableCell>{produto.nome}</TableCell>
    <TableCell>R$ {formatarPreco(produto.preco)}</TableCell>
    <AcoesCell/>
  </TableRow>
)

export type Produto = {
  _id: string | number
  nome: string
  preco: number
}

export default RowProduto