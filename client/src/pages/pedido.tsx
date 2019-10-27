import React from 'react'
import { RouteProps, useRouteMatch, useHistory } from 'react-router'
import { withTheme, makeStyles, createStyles, ThemeProvider } from '@material-ui/styles'
import { Box, Typography, Table, TableRow, TableCell, Theme, useTheme, TableBody, Button, CardContent, Card, TableHead, CardActions } from '@material-ui/core'
import { formatarPreco } from 'utils'
import { situacoesDePedidoDictionary, somarPrecoTotalPedido, situacoesDoAdmin } from 'shareds/pedido-utils'
import { Pedido } from 'types/pedido'
import { useQuery, useMutation } from 'react-apollo'
import { OBTER_PEDIDO, OBTER_PEDIDOS } from 'graphql/queries/pedido'
import { ATUALIZAR_SITUACAO_PEDIDO } from 'graphql/mutations/pedido'

interface Props extends RouteProps{}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({})
)

const DetalhePedido: React.FunctionComponent<Props> = () => {
  const theme = useTheme()
  const match = useRouteMatch<{id: string}>()
  const history = useHistory()

  const id = match && match.params.id

  const {
    data, loading, error,
  } = useQuery<{pedido: Pedido}>(OBTER_PEDIDO, {
    variables: {
      id,
    },
  })

  const [ atualizarSituacao, {
    loading: loadingEnvio
  } ] = useMutation(ATUALIZAR_SITUACAO_PEDIDO, {
    update(cache, { data: { atualizarPedido } }) {
      const data = cache.readQuery<{pedidos: Pedido[]}>({
        query: OBTER_PEDIDOS
      })
      if (!data) return

      if (situacoesDoAdmin.includes(atualizarPedido.situacao)) return

      const novaListaPedidos = [
        ...data.pedidos
      ]

      const index = novaListaPedidos.findIndex(({_id}) => _id === atualizarPedido._id)
      if(!~index) return

      novaListaPedidos.splice(index, 1)

      cache.writeQuery({
        query: OBTER_PEDIDOS,
        data: {
          pedidos: novaListaPedidos
        },
      })

      history.push('/pedidos')
    }
  })

  if (loading) return <div>Carregando...</div>
  if (error) return <div>{ error }</div>
  if (!data) return <div>Sem dados...</div>

  const situacao = situacoesDePedidoDictionary[data.pedido.situacao]

  const handleAvancarSituacao = () => {
    const novaSituacao = situacao.proximo
    if (!novaSituacao) return
    atualizarSituacao({
      variables: {
        id,
        pedido: {
          situacao: novaSituacao,
        }
      }
    })
  }

  const handleRejeitarSituacao = () => {
    const novaSituacao = situacao.rejeitar
    if (!novaSituacao) return
    atualizarSituacao({
      variables: {
        id,
        pedido: {
          situacao: novaSituacao,
        }
      }
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        m={1}
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          { situacao.descricao }
        </Typography>
        <div>
          <Card style={{
            maxWidth: 480
          }}>
            <CardContent>
              <Typography variant="h5" component="h5" gutterBottom>
                { data.pedido.cliente.nome }
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="right">
                      Quantidade
                    </TableCell>
                    <TableCell>
                      Nome
                    </TableCell>
                    <TableCell align="right">
                      Preço
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { data.pedido.itens.map((item, indice)=>
                    <TableRow key={indice}>
                      <TableCell align="right">
                        { item.quantidade }
                      </TableCell>
                      <TableCell style={{ width: '100%' }}>
                        { item.produto.nome }
                      </TableCell>
                      <TableCell align="right">
                        { formatarPreco(item.produto.preco * item.quantidade) }
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell/>
                    <TableCell style={{
                      fontWeight: 900,
                    }}>
                      Total
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        fontWeight: 900,
                      }}
                    >
                      { formatarPreco(somarPrecoTotalPedido(data.pedido)) }
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardActions style={{
              justifyContent: 'space-between'
            }}>
              {situacao.acaoRejeitar && <Button
                onClick={handleRejeitarSituacao}
                disabled={loadingEnvio}
              >
              { situacao.acaoRejeitar }
              </Button>}
              {situacao.acaoProximo && <Button
                color="primary"
                variant="contained"
                onClick={handleAvancarSituacao}
                disabled={loadingEnvio}
              >
                { situacao.acaoProximo }
              </Button>}
            </CardActions>
          </Card>
        </div>
      </Box>
    </ThemeProvider>
  )
}

export default withTheme(DetalhePedido)