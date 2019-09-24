import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(194, 12, 12)',
    },
    secondary: {
      main: 'rgb(194, 12, 12)',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  mixins: {
    toolbar: {
      minHeight: 56,
      '@media (min-width:0px) and (orientation: landscape)': {
        minHeight: 48
      },
      '@media (min-width:600px)': {
        minHeight: 64
      }
    }
  }
});

export default theme;