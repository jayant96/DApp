import * as React from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'

import { CONSTANTS } from '../constants.mjs'
import OSLogoWhite from '../shared_assets/OSLogo_White.png'
import OSLogoBlue from '../shared_assets/OSLogo_Blue.png'

// import ogyacht from '../shared_assets/ahy6543.png'
import ogyacht from '../shared_assets/587_composed_reduced.png'
// import superyacht from '../shared_assets/ahsy1029.png'
import superyacht from '../shared_assets/1029_composed_reduced.png'

export default function Test(props) {
  const modelRef = React.useRef()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    // <Grid container spacing={2}>
    //   <Grid item xs={12}>
    //     <Typography variant="h1">Test</Typography>
    //   </Grid>
    // </Grid>
    
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        {!isMobile &&
        <>
        <Grid item sm={12}>
          <Typography variant="h3">Our Collections</Typography>
        </Grid>

        <Grid item sm={12} md={5}>
          <Stack height="100%" sx={{ justifyContent: 'center' }}>
            <Box
              component="img"
              sx={{ width: '100%' }}
              src={ogyacht}
              alt="Genesis Yacht"
            />
          </Stack>
        </Grid>

        <Grid item sm={12} md={7}>
          <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
            <Typography variant="h4">Genesis Yachts</Typography>
            <Typography variant="body1">
              Genesis yachts were our first collection, launched in July 2021. It is the first verified NFT yacht collection in history.
            </Typography>
            <Typography variant="body1">
              The NFT is the image of the genesis yacht on the Ethereum blockchain. Our C'aptains can
              download their Yacht with a transparent background, in high
              resolution and as a 3D AR/VR model from our website. With each Genesis Yacht you have the full commercial rights to use it.
            </Typography>
            <Typography variant="body1">
              Genesis yachts can be named on-chain. Caps can set the name of a
              Yacht on the details page. It will show up on the marketplaces
              like Opensea or Looksrare, too.
            </Typography>
            <Typography variant="h5">Provenance</Typography>
            <Typography variant="body1">
              The smart contract is deployed on Ethereum at{' '}
              <Link
                href={`https://etherscan.io/enslookup-search?search=${CONSTANTS.ogyachts.ens_domain}`}
                target="_blank"
                rel="noreferrer"
              >
                {CONSTANTS.ogyachts.ens_domain}
              </Link>{' '}
              at{' '}
              <Link
                href={`https://etherscan.io/address/${CONSTANTS.ogyachts.token_address}`}
                target="_blank"
                rel="noreferrer"
              >
                {CONSTANTS.ogyachts.token_address}
              </Link>.
            </Typography>
            <Typography variant='body1'>Rarity of each Genesis Yacht can be checked on <Link href={`https://rarity.tools/${CONSTANTS.ogyachts.rarity_tools}`}>rarity.tools</Link>.</Typography>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={
                <Box
                  component="img"
                  src={OSLogoBlue}
                  sx={{ width: '36px' }}
                  alt="Opensea Logo"
                />
              }
              href={`https://opensea.io/collection/${CONSTANTS.ogyachts.os_slug}`}
            >
              Buy Genesis Yachts
            </Button>
          </Stack>
        </Grid>

        <Grid item sm={12} md={7} mt={8}>
          <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
            <Typography variant="h4">Superyachts</Typography>
            <Typography variant="body1">
              All C'apetains received a Superyacht for Christmas 2021. We have a
              story on what{' '}
              <Link href="https://medium.com/@ApeHarbour/pirates-log-building-superyachts-5493614ec200">
                inspired the Superyachts design.
              </Link>
            </Typography>
            <Typography variant="body1">
              Superyachts are NFTs on the Ethereum blockchain. Each Superyacht is
              unique and has different traits. Our C'aptains can download their
              Superyacht with a transparent background, and in high resolution
              from our website. With each Superyacht you have the full commercial rights to use it.
            </Typography>
            <Typography variant="body1">
              Superyachts can be named on-chain. The process is a bit more
              sophisticated than with Genesis Yachts: A Superyacht's name must be
              unique and each Superyacht can only be named once. After the name
              has been set, it stays. To name a Superyacht, the C'apetain also
              has to burn a Genesis Yacht. Caps can set the name of a yacht on
              the details page. It will show up on the marketplaces like Opensea
              or Looksrare, too.
            </Typography>
            <Typography variant="h5">Provenance</Typography>
            <Typography variant="body1">
              The smart contract is deployed on Ethereum at{' '}
              <Link
                href={`https://etherscan.io/enslookup-search?search=${CONSTANTS.superyachts.ens_domain}`}
                target="_blank"
                rel="noreferrer"
              >
                {CONSTANTS.superyachts.ens_domain}
              </Link>{' '}
              at{' '}
              <Link
                href={`https://etherscan.io/address/${CONSTANTS.superyachts.token_address}`}
                target="_blank"
                rel="noreferrer"
              >
                {CONSTANTS.superyachts.token_address}
              </Link>
              
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={
                <Box
                  component="img"
                  src={OSLogoWhite}
                  sx={{ width: '36px' }}
                  alt="Opensea Logo"
                />
              }
              href={`https://opensea.io/collection/${CONSTANTS.superyachts.os_slug}`}
            >
              Buy Superyachts
            </Button>
          </Stack>
        </Grid>

        <Grid item sm={12} md={5} mt={8}>
          <Stack height="100%" sx={{ justifyContent: 'center' }}>
            <Box
              component="img"
              sx={{ width: '100%' }}
              src={superyacht}
              alt="Super Yacht"
            />
          </Stack>
        </Grid>
        </>
}

  {isMobile &&
  <>
  <Grid item xs={12} marginTop={10}>
  <Typography variant="h5">Our Collections</Typography>
</Grid>

<Grid item xs={12}>
  <Typography variant="h4" marginBottom={4}>Our Collections</Typography>
  <Stack height="100%" sx={{ justifyContent: 'center' }}>
    <Box
      component="img"
      sx={{ width: '100%' }}
      src={ogyacht}
      alt="Genesis Yacht"
    />
  </Stack>
</Grid>

<Grid item xs={12} marginTop={4}>
  <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
    <Typography variant="h4">Genesis Yachts</Typography>
    <Typography variant="body1">
      Genesis yachts were our first collection, launched in July 2021. It is the first verified NFT yacht collection in history.
    </Typography>
    <Typography variant="body1">
      The NFT is the image of the genesis yacht on the Ethereum blockchain. Our C'aptains can
      download their Yacht with a transparent background, in high
      resolution and as a 3D AR/VR model from our website. With each Genesis Yacht you have the full commercial rights to use it.
    </Typography>
    <Typography variant="body1">
      Genesis yachts can be named on-chain. Caps can set the name of a
      Yacht on the details page. It will show up on the marketplaces
      like Opensea or Looksrare, too.
    </Typography>
    <Typography variant="h5">Provenance</Typography>
    <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
      The smart contract is deployed on Ethereum at{' '}
      <Link
        href={`https://etherscan.io/enslookup-search?search=${CONSTANTS.ogyachts.ens_domain}`}
        target="_blank"
        rel="noreferrer"
      >
        {CONSTANTS.ogyachts.ens_domain}
      </Link>{' '}
      at{' '}
      <Link
        href={`https://etherscan.io/address/${CONSTANTS.ogyachts.token_address}`}
        target="_blank"
        rel="noreferrer"
      >
        {CONSTANTS.ogyachts.token_address}
      </Link>.
    </Typography>
    <Typography variant='body1'>Rarity of each Genesis Yacht can be checked on <Link href={`https://rarity.tools/${CONSTANTS.ogyachts.rarity_tools}`}>rarity.tools</Link>.</Typography>

    <Button
      sx={{ width: '100%' }}
      variant="contained"
      color="secondary"
      size="large"
      startIcon={
        <Box
          component="img"
          src={OSLogoBlue}
          sx={{ width: '36px' }}
          alt="Opensea Logo"
        />
      }
      href={`https://opensea.io/collection/${CONSTANTS.ogyachts.os_slug}`}
    >
      Buy Genesis Yachts
    </Button>
  </Stack>
</Grid>

<Grid item sm={12} md={5} mt={8}>
  <Stack height="100%" sx={{ justifyContent: 'center' }}>
    <Box
      component="img"
      sx={{ width: '100%' }}
      src={superyacht}
      alt="Super Yacht"
    />
  </Stack>
</Grid>

<Grid item xs={12}>
  <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
    <Typography variant="h4">Superyachts</Typography>
    <Typography variant="body1">
      All C'apetains received a Superyacht for Christmas 2021. We have a
      story on what{' '}
      <Link href="https://medium.com/@ApeHarbour/pirates-log-building-superyachts-5493614ec200">
        inspired the Superyachts design.
      </Link>
    </Typography>
    <Typography variant="body1">
      Superyachts are NFTs on the Ethereum blockchain. Each Superyacht is
      unique and has different traits. Our C'aptains can download their
      Superyacht with a transparent background, and in high resolution
      from our website. With each Superyacht you have the full commercial rights to use it.
    </Typography>
    <Typography variant="body1">
      Superyachts can be named on-chain. The process is a bit more
      sophisticated than with Genesis Yachts: A Superyacht's name must be
      unique and each Superyacht can only be named once. After the name
      has been set, it stays. To name a Superyacht, the C'apetain also
      has to burn a Genesis Yacht. Caps can set the name of a yacht on
      the details page. It will show up on the marketplaces like Opensea
      or Looksrare, too.
    </Typography>
    <Typography variant="h5">Provenance</Typography>
    <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
      The smart contract is deployed on Ethereum at{' '}
      <Link
        href={`https://etherscan.io/enslookup-search?search=${CONSTANTS.superyachts.ens_domain}`}
        target="_blank"
        rel="noreferrer"
      >
        {CONSTANTS.superyachts.ens_domain}
      </Link>{' '}
      at{' '}
      <Link
        href={`https://etherscan.io/address/${CONSTANTS.superyachts.token_address}`}
        target="_blank"
        rel="noreferrer"
      >
        {CONSTANTS.superyachts.token_address}
      </Link>
      
    </Typography>

    <Button
      sx={{ width: '100%' }}
      variant="contained"
      size="large"
      startIcon={
        <Box
          component="img"
          src={OSLogoWhite}
          sx={{ width: '36px' }}
          alt="Opensea Logo"
        />
      }
      href={`https://opensea.io/collection/${CONSTANTS.superyachts.os_slug}`}
    >
      Buy Superyachts
    </Button>
  </Stack>
</Grid>
</>
  }
      </Grid>
    </Container>
     
  )
}
