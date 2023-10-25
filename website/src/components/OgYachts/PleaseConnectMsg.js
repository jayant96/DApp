import * as React from 'react'
import { Alert, AlertTitle, Box, Card, CardContent, Grid, Typography } from '@mui/material'

// import arrow from '../../shared_assets/arrowTopRight.png'
import arrow from '../../shared_assets/arrow.png'

export default function PleaseConnectMsg(props) {
  return (
    <Grid item xs={12}>
    <Alert severity="warning" icon={false} sx={{ position: 'relative' }}>
      <AlertTitle><Typography variant='h5'>Not connected!</Typography></AlertTitle>
      <Typography variant='body1'>
      Please connect your wallet to manage your yachts. 
      </Typography>
    <Box component='img' height='256px' src={arrow} alt='Arrow' sx={{ display: { xs: 'none', lg:'inline-flex'}, position: 'absolute', right: 32, bottom: 8 }}/>
    </Alert>
  </Grid>

  )
}
