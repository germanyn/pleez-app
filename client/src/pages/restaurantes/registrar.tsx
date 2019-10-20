import * as React from 'react';
import {
  Card,
  Toolbar,
  Typography,
  Container,
  CardContent,
  Grid,
  Button,
  CardActions,
  Theme,
} from '@material-ui/core';
import { withTheme, makeStyles } from '@material-ui/styles';
import theme from 'theme'
import rotas from 'rotas';
import { NavLink } from 'react-router-dom';
import CampoDeCnpj from 'components/ui/CampoDeCnpj';
import { useMutation } from 'react-apollo';
import { REGISTRAR_RESTAURANTE } from 'graphql/mutations/auth'
import { retirarFormatacaoCpfCnpj } from 'utils';
import {
  TextField,
} from 'formik-material-ui';
import {
  Form,
  Field,
  Formik,
} from 'formik';
import { obrigatorio, cnpjValido } from 'utils/regras-de-forms';
import { logar } from 'utils/auth-utils';
import CampoDeTelefone from 'components/ui/CampoDeTelefone';

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    height: '80px'
  },
}));

function RegistrarRestaurante(props: Props) {
  const classes = useStyles()
  const [ registrarRestaurante, { error } ] = useMutation(REGISTRAR_RESTAURANTE, {
    onCompleted: ({registrarRestaurante}) => {
      logar(registrarRestaurante)
    },
  })
  
  return (
    <Container>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={8} md={6}>
          <Formik
            initialValues={{
              ...restauranteInicial,
              confirmarSenha: '',
            }}
            validateOnBlur
            onSubmit = { (async({
              confirmarSenha,
              ...restaurante
            }, { setSubmitting }) => {
              try {
                await registrarRestaurante({
                  variables: {
                    registro: {
                      ...restaurante,
                      cnpj: retirarFormatacaoCpfCnpj(restaurante.cnpj),
                    }
                  }
                })
              } finally {
                setSubmitting(false)
              }
            })}
          >
            {({ values, isSubmitting }) => (
              <Form autoComplete="off">
                <Card>
                  <Toolbar style={{
                    color: theme.palette.primary.contrastText,
                    backgroundColor: theme.palette.primary.main,
                  }}>
                    <Typography variant="h5">Novo Restaurante</Typography>
                  </Toolbar>
                  <CardContent style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <Field
                      autoComplete="new-password"
                      component={TextField}
                      label="Nome do Restaurante"
                      name="nome"
                      type="text"
                      required
                      className={classes.textField}
                      validate={obrigatorio}
                    />
                    <Field
                      autoComplete="new-password"
                      component={CampoDeCnpj}
                      label="CNPJ"
                      name="cnpj"
                      required
                      className={classes.textField}
                      validate={(cnpjFormatado: string) => {
                        const cnpj = cnpjFormatado.replace(/[\D]/g, '')
                        return obrigatorio(cnpj) || cnpjValido(cnpj)
                      }}  
                    />
                    <Field
                      autoComplete="new-password"
                      component={TextField}
                      label="E-mail"
                      type="email"
                      name="email"
                      className={classes.textField}
                      required
                      validate={obrigatorio}
                    />
                    <Field
                      autoComplete="new-password"
                      component={CampoDeTelefone}
                      label="Telefone"
                      type="tel"
                      name="telefone"
                      className={classes.textField}
                      required
                      validate={obrigatorio}
                    />
                    <Field
                      autoComplete="new-password"
                      component={TextField}
                      label="Senha"
                      name="senha"
                      type="password"
                      className={classes.textField}
                      required
                      validate={obrigatorio}
                    />
                    <Field
                      autoComplete="new-password"
                      component={TextField}
                      label="Confirmar Senha"
                      type="password"
                      name="confirmarSenha"
                      className={classes.textField}
                      required
                      validate={ (valor: string) =>
                        obrigatorio(valor) || (
                          valor !== values.senha && 'Senhas não coincidem'
                        )
                      }
                    />
                  </CardContent>
                  <CardActions >
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={ isSubmitting }
                    >
                      Registrar
                    </Button>
                    { error && (<p> { error.message }</p>) }
                  </CardActions>
                  <div style={{
                    margin: theme.spacing(1),
                    textAlign: 'center',
                  }}>
                    <NavLink
                      style={{
                        color: 'grey',
                        textDecoration: 'underline',
                      }}
                      to={rotas.login.path}
                    > Já possuo uma conta </NavLink>
                  </div>
                </Card>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withTheme(RegistrarRestaurante)

type Props = {
  
};

const restauranteInicial = {
  email: '',
  nome: '',
  cnpj: '',
  telefone: '',
  senha: '',
}