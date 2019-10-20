import React from 'react'
import { RouteProps, useRouteMatch, useHistory } from 'react-router'
import { withTheme, makeStyles, createStyles } from '@material-ui/styles'
import { Box, Typography, Divider, Table, TableRow, TableCell, IconButton, Theme, useTheme, TableBody, TableFooter, Button } from '@material-ui/core'
import { useQuery, useMutation } from 'react-apollo'
import { OBTER_CATEGORIA, OBTER_CATEGORIAS } from 'graphql/queries/categoria'
import { formatarPreco } from 'utils'
import Icon from '@mdi/react'
import { mdiPencil, mdiTrashCan, mdiArrowUp, mdiArrowDown, mdiPlus } from '@mdi/js'
import DialogCategoria, { CategoriaInput } from 'components/modules/categorias/DialogCategoria'
import { ATUALIZAR_CATEGORIA, DELETAR_CATEGORIA, TROCAR_PRODUTOS_DA_CATEGORIA } from 'graphql/mutations/categoria'
import { ATUALIZAR_PRODUTO, DELETAR_PRODUTO, CRIAR_PRODUTO } from 'graphql/mutations/produto'
import DialogProduto, { ProdutoInput } from 'components/modules/produtos/DialogProduto'
import rotas from 'rotas'

interface Props extends RouteProps{}

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
    actionButton: {
      paddingTop:0,
      paddingBottom:0,
    }
  })
)

const Categoria: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const match = useRouteMatch<{id: string}>()
  const history = useHistory()

  const {
    data, loading, error,
  } = useQuery<{categoria: Categoria}>(OBTER_CATEGORIA, {
    variables: {
      id: match && match.params.id,
    },
  })

  const [ atualizarCategoria ] = useMutation(ATUALIZAR_CATEGORIA)
  const [ atualizarProduto ] = useMutation(ATUALIZAR_PRODUTO)
  
  const [ deletarCategoria ] = useMutation(DELETAR_CATEGORIA, {
    update(cache, { data: { deletarCategoria } }) {
      const data = cache.readQuery<{categorias: Categoria[]}, any>({
        query: OBTER_CATEGORIAS
      })
      if (!data) return
      const { categorias } = data;

      const indexCategoria = categorias
        .findIndex(({_id}) => _id === deletarCategoria._id)
      if (!~indexCategoria) return
      
      const categoriasAtualizadas = [ ...categorias]
      categoriasAtualizadas.splice(indexCategoria, 1)

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
      const data = cache.readQuery<{categoria: Categoria}, any>({
        query: OBTER_CATEGORIA,
        variables: {
          id: deletarProduto.categoria._id,
        },
      })
      if (!data) return
      const { categoria } = data;

      const produtosAtualizados = [...categoria.produtos]

      const indexProduto = produtosAtualizados.findIndex((({_id}) => _id === deletarProduto._id ))
      if (!~indexProduto) return

      produtosAtualizados.splice(indexProduto, 1)

      cache.writeQuery({
        query: OBTER_CATEGORIA,
        data: {
          categoria: {
            ...categoria,
            produtos: produtosAtualizados,
          },
        }
      })
    }
  })

  const [ criarProduto ] = useMutation(CRIAR_PRODUTO, {
    update(cache, { data: { criarProduto } }) {
      const data = cache.readQuery<{categoria: Categoria}, any>({
        query: OBTER_CATEGORIA,
        variables: {
          id: criarProduto.categoria._id,
        },
      })
      if (!data) return
      const { categoria } = data;

      cache.writeQuery({
        query: OBTER_CATEGORIA,
        data: {
          categoria: {
            ...categoria,
            produtos: [
              ...categoria.produtos,
              criarProduto
            ]
          },
        }
      })
    }
  })

  const [ trocarProdutosDaCategoria ] = useMutation(TROCAR_PRODUTOS_DA_CATEGORIA, {
    update(cache, { data: { trocarOrdemProdutosDaCategoria } }) {
      if (!data) return
      const cacheData = cache.readQuery<{categoria: Categoria}, any>({
        query: OBTER_CATEGORIA,
        variables: {
          id: data.categoria._id,
        },
      })
      if (!cacheData) return

      const {
        indiceA,
        indiceB
      } = trocarOrdemProdutosDaCategoria
      
      const categoriaAtualizada = { ...cacheData.categoria }
      ;[ categoriaAtualizada.produtos[indiceA], categoriaAtualizada.produtos[indiceB] ] =
       [ categoriaAtualizada.produtos[indiceB], categoriaAtualizada.produtos[indiceA] ]

      cache.writeQuery({
        query: OBTER_CATEGORIA,
        data: {
          categoria: categoriaAtualizada,
        }
      })
    }
  })

  if (loading) return <div>Carregando...</div>
  if (error) return <div>{ error }</div>
  if (!data) return <div>Sem dados...</div>

  const handleConfirmaEdicaoCategoria = (input: CategoriaInput) => {
    atualizarCategoria({
      variables: {
        id: data.categoria._id,
        categoriaInput: {
          ...input,
        }
      }
    })
  }

  const handleExcluirCategoria = async () => {
    if(!window.confirm('Deseja mesmo excluir a categoria?')) return
    await deletarCategoria({
      variables: {
        id: data.categoria._id,
      }
    })
    history.push(rotas['editar-cardapios'].path)
  }

  const handleConfirmaEdicaoProduto = (id: string, input: ProdutoInput) => {
    atualizarProduto({
      variables: {
        id,
        produtoInput: {
          ...input,
          preco: input.preco && parseFloat(input.preco),
        }
      }
    })
  }

  const handleConfirmaAdicionarProduto = (input: ProdutoInput) => {
    criarProduto({
      variables: {
        produtoInput: {
          ...input,
          preco: input.preco && parseFloat(input.preco),
          categoria: data.categoria._id,
        }
      }
    })
  }

  const handleExcluirProduto = (id: string) => {
    if(!window.confirm('Deseja mesmo excluir o produto?')) return
    deletarProduto({
      variables: {
        id: id,
      }
    })
  }

  const handleSubirProduto = (indice: number) => {
    if (indice <= 0 ) return
    trocarProdutosDaCategoria({
      variables: {
        idCategoria: data.categoria._id,
        indiceA: indice,
        indiceB: indice-1,
      }
    })
  }

  const handleDescerProduto = (indice: number) => {
    if (indice >= data.categoria.produtos.length + 1 ) return
    trocarProdutosDaCategoria({
      variables: {
        idCategoria: data.categoria._id,
        indiceA: indice,
        indiceB: indice+1,
      }
    })
  }

  return (
    <Box
      m={1}
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        <DialogCategoria
          onConfirma={handleConfirmaEdicaoCategoria}
          categoriaInicial={{
            nome: data.categoria.nome,
          }}
        >
          <IconButton
            size="small"
            style={{
              marginRight: theme.spacing(1)
            }}
          >
            <Icon path={mdiPencil} size={1} />
          </IconButton>
        </DialogCategoria>
        { data.categoria.nome }
      </Typography>
      <Divider />
      <div style={{ flex: 1 }}>
        <div>
          <Table>
            <TableBody>
              { data.categoria.produtos.map((produto, indice)=>
                <TableRow key={produto._id}>
                  <TableCell style={{
                    whiteSpace: 'nowrap'
                  }}>
                    { produto.nome }
                  </TableCell>
                  <TableCell align="right">
                    { formatarPreco(produto.preco) }
                  </TableCell>
                  <TableCell style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    tableLayout: 'fixed',
                    maxWidth: 0,
                    width: '100%',
                  }}>
                    { produto.descricao || '' }
                  </TableCell>	
                  <TableCell style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}>
                    <div style={{
                      display: 'flex',
                    }}>
                      <DialogProduto
                        onConfirma={
                          (input)=> handleConfirmaEdicaoProduto(produto._id, input)
                        }
                        produtoInicial={{
                          nome: produto.nome,
                          descricao: produto.descricao || '',
                          preco: produto.preco.toString(),
                        }}
                      >
                        <IconButton size="small">
                          <Icon path={mdiPencil} size={1} />
                        </IconButton>
                      </DialogProduto>
                      <IconButton size="small"
                        onClick={() => handleExcluirProduto(produto._id)}
                      >
                        <Icon path={mdiTrashCan} size={1} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={()=>handleSubirProduto(indice)}
                      >
                        <Icon path={mdiArrowUp} size={1} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={()=>handleDescerProduto(indice)}
                      >
                        <Icon path={mdiArrowDown} size={1} />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div style={{
          textAlign: 'left',
          paddingTop: theme.spacing(2)
        }}>
          <DialogProduto
            onConfirma={
              (input)=> handleConfirmaAdicionarProduto(input)
            }
            >
            <Button
              color="primary"
              variant="contained"
              >
              Adicionar Produto
              <Icon
                path={mdiPlus}
                className={classes.rightIcon}
                size={1}
                color={theme.palette.primary.contrastText}
              />
            </Button>
          </DialogProduto>
        </div>
      </div>
      <div style={{
        textAlign: 'right',
      }}>
        <Button
          color="primary"
          onClick={handleExcluirCategoria}
        >
          Excluir Categoria
          <Icon
            path={mdiPlus}
            className={classes.rightIcon}
            size={1}
            color={theme.palette.primary.contrastText}
          />
        </Button>
      </div>
    </Box>
  )
}

export default withTheme(Categoria)