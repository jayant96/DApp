import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faMonkey } from '@fortawesome/pro-solid-svg-icons'
import {
  faTwitter,
  faDiscord,
  faMedium,
} from '@fortawesome/free-brands-svg-icons'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import ScrollTrigger from 'mui-scroll-trigger'
import { CONSTANTS } from '../../constants.mjs'
import chrisdotn from '../../shared_assets/chrisdotn.png'
import mel from '../../shared_assets/mel.png'
import zain from '../../shared_assets/zain.png'
import umair from '../../shared_assets/umair.png'
import unchartedblock from '../../shared_assets/unchartedblock_ape.png'
import marmech from '../../shared_assets/marmech.png'
import sandboxLand from '../../shared_assets/intothemetaverse_AHY.png'
import animatedLogo from './AH_Logo_animated.webp'
import yacht2D from '../../shared_assets/superyachts.png'
import yacht3D from '../../shared_assets/3DModel6675.png'
import OSLogo from '../../shared_assets/OSLogo_Transparent_White.png'
import OSLogoWhite from '../../shared_assets/OSLogo_White.png'
import OSLogoBlue from '../../shared_assets/OSLogo_Blue.png'
import speedboat from '../../shared_assets/motor-powered-boat.png'

export default function About(props) {
  const yacht3Dmodel =
    'https://apeharbourapi-apeharbour-destinationimagesbucket7-qt2gs4gedfk5.s3.amazonaws.com/3D_Yachts/6620.glb'
  const yacht2Dmodel =
    'https://apeharbour.mypinata.cloud/ipfs/QmPTpjvT9MNoBgta7KZgSBho8bztRaCktJgJZc8VMaDaGr/6620.png'

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="xl">
      <Grid marginTop={isMobile ? 0 : 8} container spacing={isMobile ? 0 : 6}>
      <Grid container>
  {/* {isMobile && 
    <Grid item xs={12} sm={12} md={6} height="80vh">
      <Stack
        height="80vh"
        width="100%"
        sx={{ justifyContent: 'center', alignItems: 'center' }}
        spacing={1}
      >
        <Box
          component="img"
          width="45%"
          src={animatedLogo}
          alt="Ape Harbour Logo"
        />
      </Stack>
    </Grid>
  } */}

  <Grid item xs={12} sm={12} md={6}>
    <Stack spacing={isMobile ? 2 : 6} height="80vh" ml={8} sx={{ marginLeft: {xs: 0, sm: 4, md: 8}, justifyContent: 'center', alignItems: isMobile ? 'center' : 'flex-start' }}>
      <Typography variant={isMobile ? "h5" : "h2"}  sx={{ textAlign: isMobile ? 'center' : 'left' }}>
        Ape Harbour is the world's first metaverse shipyard.
      </Typography>
      <Typography variant={isMobile ? "h6" : "h4"} color='secondary' sx={{ textAlign: isMobile ? 'center' : 'left' }}>The Gen One Sandbox Sports Yacht claiming is now open.</Typography>
      <Button size='large' sx={{width: '90%'}} startIcon={
          <Box
            sx={{width: '60%', height: '60%' }}
            component="img"
            src={speedboat}
            alt="Speedboat"
          />
        } variant='contained' href='sandboxyachts/claim' >Go to Claim page</Button>
    </Stack>
  </Grid>

  {!isMobile && 
    <Grid item xs={12} sm={12} md={6} height="80vh">
      <Stack
        height="80vh"
        width="100%"
        sx={{ justifyContent: 'center', alignItems: 'center' }}
        spacing={6}
      >
        <Box
          component="img"
          width="67%"
          src={animatedLogo}
          alt="Ape Harbour Logo"
        />
      </Stack>
    </Grid>
  }
</Grid>

        <Grid item sm={12} md={12} mt={6}>
          <Stack spacing={4} sx={{ alignItems: 'center' }}>
           {!isMobile &&
            <ScrollTrigger
              transition="grow"
              ignoreDirection
              threshold={500}
              onScroll="show"
            >
              <Box
                component="img"
                sx={{ width: '100%' }}
                src={yacht2D}
                alt="Ape Harbour Yacht"
              />
            </ScrollTrigger>
}

{isMobile &&
 <Box
 component="img"
 sx={{ width: '100%' }}
 src={yacht2D}
 alt="Ape Harbour Yacht"
 marginTop={-22}
/>}

            <Typography variant={isMobile ? "h5" : "h3"} sx={{ textAlign: 'center' }}>
              We build the finest yachts of the metaverse.
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              In July 2021, we lauched our Genesis Yachts. They have become the
              first verified Yacht collection in history. For Christmas 2021,
              all Caps got a Superyacht. Learn more about the{' '}
              <Link href="/collections">collections.</Link> You already own
              Yachts? Go to the pier and{' '}
              <Link href="/harbourmanagement">manage your Yachts.</Link> If you
              want to be part of the Ape Harbour community join our{' '}
              <Link href="http://discord.gg/MGPNvCYXmu">discord.</Link>
            </Typography>
          </Stack>
        </Grid>

        {!isMobile && 
        <Grid item xs={12}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
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
}

        {isMobile && 
        <Grid item xs={12} marginTop={4}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Button
               sx={{ width: '90%' }}
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

            <Button
               sx={{ width: '90%' }}
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
}

        <Grid item sm={12} md={7} mt={isMobile ? 2: 6}>
          <Stack spacing={2} sx={{ justifyContent: 'center' }}>
            <Typography variant={isMobile ? "h5" : "h3"} mt={4} align='center'>
              Why you should become a C'apetain
            </Typography>
            <Box>
              <ul className="fa-ul">
                <li>
                  <FontAwesomeIcon icon={faMonkey} listItem />
                  <strong>Community:</strong> You become part of a global
                  community, full of passion for yachting, surfing and island
                  vibes.
                </li>
                <li>
                  <FontAwesomeIcon icon={faMonkey} listItem />
                  <strong>Full commercial rights:</strong> Use your Genesis
                  Yachts and Superyachts for your commercial projects!
                </li>
                <li>
                  <FontAwesomeIcon icon={faMonkey} listItem />
                  <strong>Access:</strong> Exclusive merch and giveaways.
                </li>
                <li>
                  <FontAwesomeIcon icon={faMonkey} listItem />
                  <strong>Benefits:</strong> Exclusive benefits for our
                  metaverse experiences.
                </li>
                <li>
                  <FontAwesomeIcon icon={faMonkey} listItem />
                  <strong>3D/AR models:</strong> View your Genesis Yacht in real
                  life with AR and become creative with 3d models. For all
                  Genesis Yachts GLB and FBX files are available.
                </li>
                <li>
                  <FontAwesomeIcon icon={faMonkey} listItem />
                  <strong>Twitter Banner:</strong> All yachts are available in
                  perfect Twitter banner size.
                </li>
                <li>
                  <FontAwesomeIcon icon={faMonkey} listItem />
                  <strong>High Resolution Version:</strong> You want to print
                  your Yacht? No problem, 4k files are available for all Yachts.
                </li>
                <li>
                  <FontAwesomeIcon icon={faMonkey} listItem />
                  <strong>Transparent Background:</strong> Unleash your
                  creativity with your yachts on transparent background.{' '}
                </li>
                <li>
                  <FontAwesomeIcon icon={faMonkey} listItem />
                  <strong>On-Chain Naming:</strong> All Genesis Yachts and
                  Superyachts can be named forever on the Ethereum blockchain.
                  The name will display on Opensea and other marketplaces.
                </li>
              </ul>
            </Box>
          </Stack>
        </Grid>

        <Grid item sm={12} md={5} mt={isMobile ? 2: 6}>
          <Stack height="100%" sx={{ justifyContent: 'center' }}>
              <ScrollTrigger
                transition="grow"
                ignoreDirection
                threshold={1500}
                onScroll="show"
              >
                <Box
                  component="img"
                  sx={{ width: '100%' }}
                  src={yacht3D}
                  alt="3D model of yacht"
                />
              </ScrollTrigger>
          </Stack>
        </Grid>

        <Grid item sm={12} md={7} mt={6}>
          <ScrollTrigger
            transition="grow"
            ignoreDirection
            threshold={2000}
            onScroll="show"
          >
            <Box
              component="img"
              sx={{ width: '100%' }}
              src={sandboxLand}
              alt="Sandbox Estate"
            />
          </ScrollTrigger>
        </Grid>

        <Grid item sm={12} md={5} mt={isMobile ? 1: 6}>
          <Stack spacing={2} height="100%" sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant={isMobile ? "h5" : "h3"} mt={4} align="center">
              Into the Metaverse
            </Typography>
            <Typography variant="body1" align="center">
              We own a 12x12 estate in The Sandbox and 5 Otherdeeds on the
              Otherside. We are creating exciting experiences for our Caps
              roaming the metaverse oceans.
            </Typography>
          </Stack>
        </Grid>

        <Grid item sm={12} md={12} mt={6}>
          <Stack spacing={4} sx={{ alignItems: 'center' }}>
            <Typography variant={isMobile ? "h5" : "h3"} sx={{ textAlign: 'center' }}>
              We are Ape Harbour
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              In July 2021, Ape Harbour was founded by apes, who wanted to build
              their own metaverse yachts. We are a team full of passion for the
              BAYC and Web3 community. We aren't affiliated with the BAYC or
              Yuga Labs LLC.
            </Typography>
            <Typography variant="body1" align='center'>
              We are working together with builders from all over the world and
              our core team is based in Europe:
            </Typography>
          </Stack>
        </Grid>

        <Grid container spacing={0.5} item sm={12} md={6} lg={3}>
          <ScrollTrigger
            transition="grow"
            ignoreDirection
            threshold={2700}
            onScroll="show"
          >
            <Card>
              <CardMedia component="img" image={chrisdotn} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  chrisdotn
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Co-Founder, shadowy crypto super coder
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  color="inherit"
                  size="medium"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/chrisdotn"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </IconButton>
              </CardActions>
            </Card>
          </ScrollTrigger>
        </Grid>

        <Grid container spacing={0.5} item sm={12} md={6} lg={3}>
          <ScrollTrigger
            transition="grow"
            ignoreDirection
            threshold={2700}
            onScroll="show"
          >
            <Card>
              <CardMedia component="img" image={mel} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  mel
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Co-Founder, builder and creator
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  color="inherit"
                  size="medium"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/_NFTs"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </IconButton>
              </CardActions>
            </Card>
          </ScrollTrigger>
        </Grid>

        <Grid container spacing={0.5} item sm={12} md={6} lg={3}>
          <ScrollTrigger
            transition="grow"
            ignoreDirection
            threshold={2700}
            onScroll="show"
          >
            <Card>
              <CardMedia component="img" image={zain} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Zain
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Creative Genius, Genesis Yacht and Superyacht designer
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  color="inherit"
                  size="medium"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/ikorzain"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </IconButton>
              </CardActions>
            </Card>
          </ScrollTrigger>
        </Grid>

        <Grid container spacing={0.5} item sm={12} md={6} lg={3}>
          <ScrollTrigger
            transition="grow"
            ignoreDirection
            threshold={2700}
            onScroll="show"
          >
            <Card>
              <CardMedia component="img" image={unchartedblock} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  unchartedblock
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Discord Mod
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  color="inherit"
                  size="medium"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/unchartedblock"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </IconButton>
              </CardActions>
            </Card>
          </ScrollTrigger>
        </Grid>

        <Grid container spacing={0.5} item sm={12} md={6} lg={3}>
          <ScrollTrigger
            transition="grow"
            ignoreDirection
            threshold={2700}
            onScroll="show"
          >
            <Card>
              <CardMedia component="img" image={marmech} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  marmech
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Discord Mod
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  color="inherit"
                  size="medium"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/MarmechNFT"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </IconButton>
              </CardActions>
            </Card>
          </ScrollTrigger>
        </Grid>
      </Grid>
    </Container>
  )
}
