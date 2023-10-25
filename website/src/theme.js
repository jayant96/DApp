import { blue, red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

// A custom theme for this app
const theme = createTheme({
  typography: {
    // fontFamily: 'Josefin Sans, Open Sans, PT Sans, Roboto Slab, Recursive, Arial',
    fontFamily: 'RalewayVariable, Open Sans, Roboto Slab, Recursive, Arial',
    // fontFamily: 'PT Sans, Roboto Slab, Recursive, Arial',
    allVariants: {
      color: '#3d3d3d',
    },
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 900,
    },
    h3: {
      fontWeight: 900,
    },
    h4: {
      fontWeight: 900,
    },
    h5: {
      fontWeight: 900,
    },
    h6: {
      fontWeight: 900,
    },
    quote: {
      color: 'secondary',
      fontWeight: 500,
      fontSize: '2.125rem',
      // fontStyle: 'italic'
    },
    button: {
      fontWeight: 900,
    },
    body1: {
      fontSize: '1.25rem',
      // color: '#ccc'
    },
  },
  palette: {
    primary: {
      main: '#61ffea',
      // contrastText: '#231123',
      contrastText: '#3d3d3d'
    },
    secondary: {
      // main: '#82294a',
      main: '#002ca3',
    },
    error: {
      main: red.A400,
    },
    darkBg: {
      main: '#202020',
      contrastText: '#fff',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
        color: '#3d3d3d'
      },
      styleOverrides: {
        root: {
          '&:hover': {
            // fontStyle: 'italic',
            // color: 'white',
            // background:
            // 'url(https://s2.svgbox.net/pen-brushes.svg?ic=brush-5&color=002ca3)',
          },
          background: 'url(https://s2.svgbox.net/pen-brushes.svg?ic=brush-5&color=ffffcc)'
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // fontFamily: 'RalewayVariable, Helvetica, Arial',
          // fontWeight: 700,
        }
      }
    }
  },
})

export default theme
