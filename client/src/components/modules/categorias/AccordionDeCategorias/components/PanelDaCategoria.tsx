import React from 'react'
import { createStyles, ExpansionPanel, ExpansionPanelSummary, makeStyles, Theme, Typography, ExpansionPanelDetails } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import { useMutation } from 'react-apollo';
import { CRIAR_PRODUTO, ATUALIZAR_PRODUTO, DELETAR_PRODUTO } from 'graphql/mutations';
import { OBTER_CATEGORIAS } from 'graphql/queries';
import { ProdutoInput } from 'components/modules/produtos/DialogProduto';
import TableDeProdutos from 'components/modules/produtos/TableDeProdutos';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

export default function PanelCategoria ({
  categoria,
  expanded,
  onExpand,
}: Props) {
  const classes = useStyles();

  const [ criarProduto ] = useMutation(CRIAR_PRODUTO, {
    update(cache, { data: { criarProduto } }) {
      const data = cache.readQuery<{categorias: Categoria[]}, any>({
        query: OBTER_CATEGORIAS
      })
      if (!data) return
      const { categorias } = data;

      const index = categorias.findIndex(({_id}) => _id === categoria ._id)
      if (!~index) return
      
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

  const [ atualizarProduto ] = useMutation(ATUALIZAR_PRODUTO, {
    update(cache, { data: { atualizarProduto } }) {
      const data = cache.readQuery<{categorias: Categoria[]}, any>({
        query: OBTER_CATEGORIAS
      })
      if (!data) return
      const { categorias } = data;

      const indexCategoria = categorias.findIndex(({_id}) => _id === categoria ._id)
      if (!~indexCategoria) return
      
      const categoriasAtualizadas = [ ...categorias]
      const categoriaAtualizada = categoriasAtualizadas[indexCategoria]

      const produtos = [ ...categoriaAtualizada.produtos ]
      const indexProduto = produtos.findIndex(({_id}) => _id === atualizarProduto._id )
      if (!~indexProduto) return

      produtos.splice(indexProduto, 1, atualizarProduto)
      categoriaAtualizada.produtos = produtos

      categoriasAtualizadas.splice(indexCategoria, 1, categoriaAtualizada)

      cache.writeQuery({
        query: OBTER_CATEGORIAS,
        data: {
          categorias: categoriasAtualizadas,
        }
      })
    }
  })

  const [ deletarProduto ] = useMutation(DELETAR_PRODUTO, {
    update(cache, { data: { deletarProduto } }) {
      const data = cache.readQuery<{categorias: Categoria[]}, any>({
        query: OBTER_CATEGORIAS
      })
      if (!data) return
      const { categorias } = data;

      const indexCategoria = categorias.findIndex(({_id}) => _id === categoria ._id)
      if (!~indexCategoria) return
      
      const categoriasAtualizadas = [ ...categorias]
      const categoriaAtualizada = categoriasAtualizadas[indexCategoria]

      const produtos = [ ...categoriaAtualizada.produtos ]
      const indexProduto = produtos.findIndex(({_id}) => _id === deletarProduto._id )
      if (!~indexProduto) return

      produtos.splice(indexProduto, 1)
      categoriaAtualizada.produtos = produtos

      categoriasAtualizadas.splice(indexCategoria, 1, categoriaAtualizada)

      cache.writeQuery({
        query: OBTER_CATEGORIAS,
        data: {
          categorias: categoriasAtualizadas,
        }
      })
    }
  })

  const incluirProdutoCategoria = async (
    {preco, ...produto}:  Required<ProdutoInput>
  ) => {
    await criarProduto({
      variables: {
        produtoInput: {
          ...produto,
          preco: parseFloat(preco),
          categoria: categoria._id,
        }
      }
    })
  }

  const onEditarProduto = async (
    id: string,
    {preco, ...produto}: Required<ProdutoInput>
  ) => {
    await atualizarProduto({
      variables: {
        id: id,
        produtoInput: {
          ...produto,
          preco: parseFloat(preco),
        }
      }
    })
  }

  const onExcluirProduto = async (
    id: string
  ) => {
    await deletarProduto({
      variables: {
        id: id,
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
        <TableDeProdutos
          onIncluirProduto = { incluirProdutoCategoria }
          onProdutoEditado = { onEditarProduto }
          onExcluirProduto = { onExcluirProduto }
          produtos = { categoria.produtos }
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}


interface Props  {
  categoria: Categoria
  onAtualizarCategoria?: (categoria: Categoria) => void
  expanded?: boolean
  onExpand?: (id: string) => void
  children?: React.ReactElement
}