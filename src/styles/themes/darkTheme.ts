import { createTheme } from "@mui/material/styles";



/* - Dark Blue (Dark Mode Elements): hsl(209, 23%, 22%)
- Very Dark Blue (Dark Mode Background): hsl(207, 26%, 17%)
- Very Dark Blue (Light Mode Text): hsl(200, 15%, 8%)
- Dark Gray (Light Mode Input): hsl(0, 0%, 52%)
- Very Light Gray (Light Mode Background): hsl(0, 0%, 98%)
- White (Dark Mode Text & Light Mode Elements): hsl(0, 0%, 100%) */

export const darkTheme = createTheme({
  palette: {
    primary: {
     main: "hsl(209, 23%, 22%)",

    },
    secondary: {
      main: "hsl(0, 0%, 52%)",
    },
    text: {
        primary: "hsl(0, 0%, 100%)"
    },
    background: {
        default: "hsl(207, 26%, 17%)",
        paper: "hsl(209, 23%, 22%)"
    },
  },
  components: {
    MuiInput: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          color: "red"
        }),
      },
    },
    MuiSelect:{}
  }
});


