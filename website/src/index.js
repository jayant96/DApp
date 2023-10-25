import * as React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import App from './App'
import theme from './theme'
import darkTheme from './theme'
import { MoralisProvider } from 'react-moralis'
import { BrowserRouter, Router } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext'

const SERVER_URL = 'https://xnfi3jqkxjuj.usemoralis.com:2053/server'
const APP_ID = 'rtCDPtyMyOoACQ0XB67li2csUfsn00TyRR9ISFHo'

console.log({ APP_ID })
console.log({ SERVER_URL })

ReactDOM.render(
  <MoralisProvider serverUrl={SERVER_URL} appId={APP_ID}>
    <ThemeProvider theme={darkTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </AuthProvider>
    </ThemeProvider>
  </MoralisProvider>,
  document.querySelector('#root'),
)
