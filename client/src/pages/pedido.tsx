import React from 'react'
import { RouteProps, useRouteMatch, useHistory } from 'react-router'
import { withTheme, makeStyles, createStyles, ThemeProvider } from '@material-ui/styles'
import { Box, Typography, Table, TableRow, TableCell, Theme, useTheme, TableBody, Button, CardContent, Card, TableHead, CardActions } from '@material-ui/core'
import { formatarPreco } from 'utils'
import { Pedido } from '../../../commons/pedidos/types'
import { situacoesDePedidoDictionary, somarPrecoTotalPedido } from '../../../commons/pedidos/utils'

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

const DetalhePedido: React.FunctionComponent<Props> = () => {
  const theme = useTheme()

  // const {
  //   data, loading, error,
  // } = useQuery<{categoria: Categoria}>(OBTER_CATEGORIA, {
  //   variables: {
  //     id: match && match.params.id,
  //   },
  // })
  const { loading, data, error } = {
    data: {
      pedido: {
        _id: 'sasdbasdb-32-vdab-33-d',
        nome: 'Nome Completo',
        situacao: 'recebido',
        itens: [
          {
            quantidade: 2,
            nome: 'Bacon Super',
            preco: 45.00,
          },
          {
            quantidade: 3,
            nome: 'Coca-cola',
            preco: 18.00,
          },
        ]
      } as Pedido,
      errors: null,
    },
    loading: false,
    error: null,
  }

  if (loading) return <div>Carregando...</div>
  if (error) return <div>{ error }</div>
  if (!data) return <div>Sem dados...</div>

  const situacao = situacoesDePedidoDictionary[data.pedido.situacao]

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
                { data.pedido.nome }
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
                        { item.nome }
                      </TableCell>
                      <TableCell align="right">
                        { formatarPreco(item.preco) }
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
              <Button>
                Recusar
              </Button>
              <Button
                color="primary"
                variant="contained"
              >
                Aceitar
              </Button>
            </CardActions>
          </Card>
        </div>
      </Box>
    </ThemeProvider>
  )
}

export default withTheme(DetalhePedido)