import { createMuiTheme } from '@material-ui/core/styles';

const Blue = "#0B72B9";
const Orange = "#FFBA60";
const Grey = "#868686";

export default createMuiTheme({
  palette: {
    common: {
      blue: Blue,
      orange: Orange
    },
    primary: {
      main: Blue
    },
    secondary: {
      main: Orange
    }
  }
});