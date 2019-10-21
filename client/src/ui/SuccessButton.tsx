import { green } from "@material-ui/core/colors";
import { withStyles, Theme, Button } from "@material-ui/core";

const SuccessButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

export default SuccessButton