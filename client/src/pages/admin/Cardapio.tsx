import React from 'react'
import { Typography, Container, Box } from '@material-ui/core';
import AccordionDeCategorias, {
  Ref as AccordionDeCategoriasRef
} from 'components/modules/categorias/AccordionDeCategorias'
import { useQuery, useMutation } from 'react-apollo';
import { OBTER_CATEGORIAS } from 'graphql/queries';
import { CRIAR_CATEGORIA } from 'graphql/mutations';
import DialogCategoria, { CategoriaInput } from 'components/modules/categorias/DialogCategoria';

interface Props{}

const Cardapio: React.FunctionComponent<Props> = (props) => {

  const accordionDeCategorias = React.useRef<AccordionDeCategoriasRef>(null)

  const { loading, data, error } = useQuery<{categorias: Categoria[], errors: any}, any>(OBTER_CATEGORIAS);
  
  const [ criarCategoria ] = useMutation(CRIAR_CATEGORIA, {
    update(cache, { data: { criarCategoria } }) {
      const data = cache.readQuery<{categorias: Categoria[]}>({
        query: OBTER_CATEGORIAS
      });
      if (!data) return
      const { categorias } = data;
      cache.writeQuery({
        query: OBTER_CATEGORIAS,
        data: { categorias: categorias.concat([criarCategoria]) },
      });
    }
  })

  const adicionarCategoria = async (categoria: CategoriaInput) => { 
    const { data } = await criarCategoria({
      variables: {
        input: {
          ...categoria,
        }
      }
    })
    accordionDeCategorias.current && accordionDeCategorias.current.setExpanded(data.criarCategoria._id)
  }

  if (loading) return <div>Carregando...</div>
  if (error) return <div>{ error }</div>
  if (!data) return <div>Sem dados...</div>
  if (data.errors) return <div>{
    data.errors
  }</div>
  
  return (
    <Container >
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cardápio
        </Typography>
        <AccordionDeCategorias
          categorias = { data.categorias }
          ref={ accordionDeCategorias }
        />
        <DialogCategoria
          onConfirma ={ adicionarCategoria }
        />
      </Box>
    </Container>
  )
}

export default Cardapio