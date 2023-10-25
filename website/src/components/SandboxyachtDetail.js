import React from 'react'
import {
  Grid,
  Link,
  Stack,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { useParams, useLocation } from 'react-router-dom'

import SandboxyachtImgLink from './SandboxyachtImgLink'
import { useAuth } from './AuthContext'

export default function SandboxyachtDetail(props) {

  const { session, authenticated } = useAuth();
  const location = useLocation();
  const nft = location.state?.nft;
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  if(!nft) {
    return <PleaseConnectMsg height='120px' />;
  }

  const { tokenId,  metadata} = nft
  const { name, image, description, animation_url } = metadata
  const animUrl = nft.metadata && nft.metadata.animation_url
  const animationUrl = animUrl ? animUrl.replace( 
          "ipfs://", 
          "https://apeharbour.mypinata.cloud/ipfs/"
        ) + "?pinataGatewayToken=DpUkFkY4XM34Nwun1APLX8jozT9nY5J-DAxq5tK141A-BczLnktEeq7GaPAbwTDF" : null
  const ipfsUrl = nft.metadata && nft.metadata.image
  const httpUrl = ipfsUrl 
      ? ipfsUrl.replace(
          "ipfs://", 
          "https://apeharbour.mypinata.cloud/ipfs/"
        ) + "?pinataGatewayToken=DpUkFkY4XM34Nwun1APLX8jozT9nY5J-DAxq5tK141A-BczLnktEeq7GaPAbwTDF"
      : null
  
  const params = useParams()
 

  return (
    <Grid>
    {authenticated ? (
    <React.Fragment>    
    <Grid container spacing={2}>
      <Grid item xs={12} marginTop={isMobile ? 15 : 2}>
        <Typography variant="h4" gutterBottom>{name}</Typography>
        { authenticated && (
        <Typography variant="body1" gutterBottom>
               owned by <Link
              href={`https://etherscan.io/address/${session.address}`}
              target="_blank"
              rel="noreferrer"
            > <strong> 'You' </strong> 
            </Link>
            </Typography>
            )}
      </Grid>
      <Grid item xs={12} md={8} lg={5}>


        <model-viewer
            alt={name}
            src={animationUrl}
            // ar
            // ar-modes="webxr scene-viewer quick-look"
            // skybox-image={ah_background}
            poster={httpUrl}
            seamless-poster
            shadow-intensity="1"
            camera-controls
            enable-pan
            autoplay
            // exposure="2"
            neutral
            style={{
              width: 'inherit',
              height: '1024px',
            }}
          ></model-viewer>

      </Grid>

      <Grid item xs={12} md={4} lg={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Description
            </Typography>
            <Typography variant='body1' gutterBottom>
              {description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Downloads
              </Typography>
            </Grid>
          <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <SandboxyachtImgLink yachtTokenID={tokenId} />
              </Stack>
            </Grid>
         
          
          {/* {attributes.map((a, index) => (
            <Grid
              item
              xs={3}
              md={6}
              lg={3}
              key={[tokenId, a.trait_type, a.value].join('-')}
            >
              <Card>
                <CardHeader
                  title={a.trait_type}
                  subheader={a.value}
                  titleTypographyProps={{
                    variant: 'h6',
                    textAlign: 'center',
                  }}
                  subheaderTypographyProps={{ textAlign: 'center' }}
                />
              </Card>
            </Grid>
          ))} */}
          {/* <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Downloads
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Stack direction='row' spacing={2}>
              <Button color='secondary' variant="outlined" href={`https://lgmxnzu6lj.execute-api.us-east-1.amazonaws.com/prod/twitter-banner/${tokenId}`}>Twitter Banner</Button>
              <Button color='secondary' variant='outlined' href={`https://lgmxnzu6lj.execute-api.us-east-1.amazonaws.com/prod/transparent-background/${tokenId}`}>Transparent Background</Button>
              <Button color='secondary' variant='outlined' href={`https://xr21gnk28f.execute-api.us-east-1.amazonaws.com/dev/yachts/${tokenId}/highRes`}>High Res</Button>
            </Stack>
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>

    </React.Fragment>) : ( <PleaseConnectMsg height='120px' />)}
    </Grid>
  )
}
