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

import kodaSurfing from '../shared_assets/koda_surfing.png'

export function Maintenance(props) {
  const modelRef = React.useRef()

  return (
    // <Grid container spacing={2}>
    //   <Grid item xs={12}>
    //     <Typography variant="h1">Test</Typography>
    //   </Grid>
    // </Grid>

    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item sx={{ height:'100vh'}} sm={6}>
          <Stack height='100%' sx={{ justifyContent: 'center'}}>
          <Box
            component="img"
            sx={{ width: '100%' }}
            src={kodaSurfing}
            alt="Koda Surfing"
          />

          </Stack>
        </Grid>
        <Grid item sm={6}>
          <Stack height="100%" sx={{ justifyContent: 'center' }} spacing={4}>
            <Typography variant="h3">Harbour Upgrade in progress!</Typography>
            <Typography>
              Our Kodas are currently upgrading the harbour pier. That will take
              a while. Grab your surfboards, hang loose and hit the waves for a
              bit! Soon the piers will be open again.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}
