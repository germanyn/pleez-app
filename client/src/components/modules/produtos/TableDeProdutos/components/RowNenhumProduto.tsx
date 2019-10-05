import React from 'react'
import { TableRow, TableCell, Theme } from "@material-ui/core";
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    semProduto: {
      textAlign: 'center',
      fontStyle: 'italic',
    }
  }),
);

export default function NenhumProduto() {
  const classes = useStyles()
  return(
    <TableRow>
      <TableCell colSpan={3} className={classes.semProduto}>
        Nenhum produto adicionado...
      </TableCell>
    </TableRow>
  )
}