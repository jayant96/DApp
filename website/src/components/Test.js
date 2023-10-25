import * as React from 'react'
import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'

export default function Test(props) {
  const modelRef = React.useRef()

  return (
    // <Grid container spacing={2}>
    //   <Grid item xs={12}>
    //     <Typography variant="h1">Test</Typography>
    //   </Grid>
    // </Grid>

    <Container maxWidth="lg">
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
    </Container>
  )
}
