import * as React from 'react'
import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'

export default function TempDisabled(props) {
  const modelRef = React.useRef()

  return (
    // <Grid container spacing={2}>
    //   <Grid item xs={12}>
    //     <Typography variant="h1">Test</Typography>
    //   </Grid>
    // </Grid>

    <Container maxWidth="lg">
      {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}> */}
      <Stack mt='30vh' spacing={4}>

      <Typography variant='h1'>⌛️ Awaiting the Merge ⌛️</Typography>
      <Typography variant='body1'>As Ethereum prepares for <Link href='https://ethereum.org/en/upgrades/merge/'>the merge</Link>, we have temporarily disabled the yacht management. Once the dust setlles a bit on the new merged chain, we will re-enable it. </Typography>
      </Stack>
      {/* </Box> */}
    </Container>
  )
}
