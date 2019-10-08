import React, { useRef } from 'react'
import {
  createStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  makeStyles,
  Theme,
  Typography,
  ExpansionPanelDetails,
  Button,
} from '@material-ui/core';
import Icon from '@mdi/react';
import {
  mdiChevronDown,
  mdiPencilOutline,
  mdiDeleteOutline,
} from '@mdi/js';
import { useMutation } from 'react-apollo';
import {
  CRIAR_PRODUTO,
  ATUALIZAR_PRODUTO,
  DELETAR_PRODUTO,
  ATUALIZAR_CATEGORIA,
  DELETAR_CATEGORIA,
} from 'graphql/mutations';
import { OBTER_CATEGORIAS } from 'graphql/queries';
import { ProdutoInput } from 'components/modules/produtos/DialogProduto';
import TableDeProdutos from 'components/modules/produtos/TableDeProdutos/TableDeProdutos';
import DialogCategoria, {
  Ref as DialogCategoriaRef, CategoriaInput,
} from 'components/modules/categorias/DialogCategoria'

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

  const dialogCategoria = useRef<DialogCategoriaRef>(null)

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

  const [ atualizarProduto ] = useMutation(ATUALIZAR_PRODUTO)

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

  const [ atualizarCategoria ] = useMutation(ATUALIZAR_CATEGORIA)

  const [ deletarCategoria ] = useMutation(DELETAR_CATEGORIA, {
    update(cache, { data: { deletarCategoria } }) {
      const data = cache.readQuery<{categorias: Categoria[]}, any>({
        query: OBTER_CATEGORIAS
      })
      if (!data) return
      const { categorias } = data;

      const indexCategoria = categorias.findIndex(({_id}) => _id === categoria ._id)
      if (!~indexCategoria) return

      const categoriasAtualizadas = [ ...categorias ]
      categoriasAtualizadas.splice(indexCategoria, 1)

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
    if(!window.confirm('Deseja mesmo excluir o produto?')) return
    await deletarProduto({
      variables: {
        id: id,
      }
    })
  }

  const editarCategoriaHandler = () => {
    if(!dialogCategoria.current) return
    dialogCategoria.current.setCategoria({
      nome: categoria.nome,
    })
    dialogCategoria.current.setOpened(true)
  }

  const excluirCategoriaHandler = () =>{
    if(!window.confirm('Deseja escluir essa Categoria?')) return
    deletarCategoria({
      variables: {
        id: categoria._id,
      }
    })
  }

  const confirmaEdicaoHandler = async (input: CategoriaInput) => {
    await atualizarCategoria({
      variables: {
        id: categoria._id,
        categoriaInput: {
          ...input,
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
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}>
          <div style={{
            marginLeft: 'auto',
          }}>
            <Button
              style={{ backgroundColor: "lightgreen" }}
              onClick={editarCategoriaHandler}
            >
              <Icon path={mdiPencilOutline} size={1} />
              Editar
            </Button>
              <Button style={{ color: "red" }}
              onClick={excluirCategoriaHandler}
            >
              <Icon path={mdiDeleteOutline} size={1} />
              Excluir
            </Button>
            <DialogCategoria
              ref = { dialogCategoria }
              onConfirma = { confirmaEdicaoHandler }
            />
          </div>
          <TableDeProdutos
            onIncluirProduto = { incluirProdutoCategoria }
            onProdutoEditado = { onEditarProduto }
            onExcluirProduto = { onExcluirProduto }
            produtos = { categoria.produtos }
          />
        </div>
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