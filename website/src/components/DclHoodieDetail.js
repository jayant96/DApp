import * as React from 'react'
import {
  Box,
  Card,
  CardHeader,
  Grid,
  Link,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { useLocation } from 'react-router-dom'
import PleaseConnectMsg from './OgYachts/PleaseConnectMsg'
import { useAuth } from './AuthContext'

export default function DclHoodieDetail(props) {
  const { session, authenticated } = useAuth()
  const location = useLocation()
  const nft = location.state?.nft
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  
  if(!nft) {
    return <PleaseConnectMsg height='120px' />;
  }

  const { tokenId,  metadata} = nft;
  const { name, attributes, image } = metadata;
  const ipfsUrl = nft.metadata && nft.metadata.image;
  const httpUrl = ipfsUrl ? ipfsUrl.replace("ipfs://", "https://ipfs.io/ipfs/") : null;

  return ( <Grid>
    {authenticated ? (
    <React.Fragment>    
    <Grid container spacing={2}>
      <Grid item xs={12} marginTop={isMobile ? 15 : 2}>
        <Typography variant="h4" gutterBottom>{name}</Typography>
        <Typography variant="body1" gutterBottom>
        owned by 
               <Link
              href={`https://etherscan.io/address/${session.address}`}
              target="_blank"
              rel="noreferrer"
               >
                 <strong> 'You' </strong> 
            </Link>
            </Typography>
      </Grid>
      <Grid item xs={12} md={8} lg={7}>
        <Box
          component="img"
          src={httpUrl}
          alt={name}
          loading="lazy"
          sx={{ width: '100%' }}
        />
      </Grid>

      <Grid item xs={12} md={4} lg={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Traits
            </Typography>
          </Grid>
          {attributes.map((a, index) => (
            <Grid
              item
              xs={12}
              md={4}
              lg={3}
              key={[tokenId, a.trait_type, a.value].join('-')}
             container spacing={1}
            >
              <Card>
                <CardHeader
                  title={a.trait_type}
                  subheader={a.value}
                   titleTypographyProps={{
                      variant: 'subtitle',
                      textAlign: 'center',
                    }}
                    subheaderTypographyProps={{
                      variant: 'body2',
                      textAlign: 'center',
                    }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
    
    {/* <FullscreenBackdrop open={backdropActive} /> */}

    </React.Fragment>) : (<PleaseConnectMsg height='120px' />)} </Grid>
  )
}
