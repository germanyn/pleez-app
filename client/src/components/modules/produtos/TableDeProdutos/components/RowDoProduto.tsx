import React from 'react'
import Icon from "@mdi/react";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import { formatarPreco } from "utils";
import { mdiPencilOutline, mdiDeleteOutline } from "@mdi/js";
import DialogProduto, {
  Ref as DialogProdutoRef,
  Props as DialogProdutoProps,
} from '../../DialogProduto';

export default function RowDoProduto ({
  produto,
  onProdutoEditado,
  onExcluirProduto,
}: Props) {
  const dialogProduto = React.useRef<DialogProdutoRef>(null)

  return (
    <TableRow>
      <TableCell>{produto.nome}</TableCell>
      <TableCell>R$ {formatarPreco(produto.preco)}</TableCell>
      <TableCell style={{ width: '1%', whiteSpace: 'nowrap' }}>
        <IconButton onClick={editarProduto}>
          <Icon path={mdiPencilOutline} size={1} />
        </IconButton>
        <IconButton  onClick={onExcluirProduto}>
          <Icon path={mdiDeleteOutline} size={1} />
        </IconButton>
      </TableCell>
      <DialogProduto
        ref = { dialogProduto }
        onConfirma = { (input) => onProdutoEditado && onProdutoEditado(input) }
      />
    </TableRow>
  )

  function editarProduto() {
    if(!dialogProduto.current) return
    dialogProduto.current.setProduto({
      nome: produto.nome,
      preco: produto.preco.toString(),
    })
    dialogProduto.current.setOpened(true)
  }
}

export type Props = {
  produto: Produto
  onProdutoEditado: DialogProdutoProps['onConfirma']
  onExcluirProduto: () => void
}