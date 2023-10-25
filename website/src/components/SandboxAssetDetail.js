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

import { useAuth } from './AuthContext'
import PleaseConnectMsg from './OgYachts/PleaseConnectMsg'

export default function SandboxAssetDetail(props) {

  const { session, authenticated } = useAuth();
  const location = useLocation();
  const nft = location.state?.nft;
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  if(!nft) {
    return <PleaseConnectMsg height='120px' />;
  }

  const { tokenId,  metadata} = nft;
  const { name, description } = metadata;
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
  console.log('Animation Link: ', animationUrl);
  
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
            poster={httpUrl}
            seamless-poster
            shadow-intensity="1"
            camera-controls
            enable-pan
            autoplay
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
        </Grid>
      </Grid>
    </Grid>
    </React.Fragment>) :( <PleaseConnectMsg height='120px' />)}
    </Grid>
  )
}
