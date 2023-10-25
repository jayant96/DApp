
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Backdrop,
  Box,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardActionArea,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { styled } from '@mui/system'

import { useAuth } from '../AuthContext'
import axios from 'axios'
import openseaLogoBlue from '../../shared_assets/opensea_Logomark-Blue.svg'
import StatsCard from './StatsCard'
import PleaseConnectMsg from './PleaseConnectMsg'
import YachtName from '../yachtCard/YachtName'



const StyledCardMedia = styled(CardMedia)`
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  };`

const StyledCard = styled(Card)`
  transition: border 0.3s ease-in-out;
  border: 2px solid transparent;

  &:hover {
    border: 2px solid rgba(7, 240, 240, 0.5);
  };`

  const getShortVersion = (s) => {
    if (s.length > 22) {
      return s.slice(0, 21) + '…'
    }
    return s
  }



export default function Hoodie(props) {

  const { session, authenticated } = useAuth()
  const [nftBalances, setNftBalances] = useState([])
  const showDetails = (nft) => {
    navigate(nft.tokenId, {state: { nft }});
  }
  const navigate = useNavigate();
  const [loadingYachts, setLoadingYachts] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    if(authenticated){
      axios.get('https://m59jtciqre.execute-api.us-east-1.amazonaws.com/getHoodiesNfts', {
        params:{ address: session.address,
        },
       })
       .then(({data}) => {
         setNftBalances(data);
         console.log('Hoodies Data: ', data);
       }).catch((error) => {
         console.error(error);
       });
    }
  },[authenticated, session.address])


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} marginTop={isMobile ? 15 : 2}>
        <Typography variant="h4">Hoodies Data</Typography>
      </Grid>

      {authenticated && nftBalances && (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <StatsCard caption={`Your ${props.token_name}`} value={nftBalances.length} />
        </Grid>
      )}

      {!authenticated && (
        <PleaseConnectMsg height='350px' />
      )}

        {authenticated && (
          <Grid item xs={12} mt={2}>
        <Typography variant="h4">Your {props.token_name}</Typography>
      </Grid>
        )}
  
        {nftBalances && nftBalances.map((nft, index) => { 
          const ipfsUrl = nft.metadata && nft.metadata.image;
          const httpUrl = ipfsUrl 
          ? ipfsUrl.replace(
              "ipfs://", 
              "https://apeharbour.mypinata.cloud/ipfs/"
            ) + "?pinataGatewayToken=DpUkFkY4XM34Nwun1APLX8jozT9nY5J-DAxq5tK141A-BczLnktEeq7GaPAbwTDF"
          : null;
         return ( 
            <Grid item xs={12} sm={6} md={3} lg={2} key={index}>
              <>
              <StyledCard sx={{ position: 'relative' }}>
              <CardActionArea onClick={() => showDetails(nft)}>
              <StyledCardMedia
                component="img"
                image={httpUrl}
                alt="Yacht"
             />
            <Chip
              label={`№${nft.tokenId}`}
              sx={{ position: 'absolute', right: 8, top: 8 }}
              color="primary"
           />
          <CardContent sx={{ paddingBottom: 0 }}>
            <YachtName name={nft.metadata.name} />
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Stack direction="row" spacing={2} sx={{ width:'100%'}} justifyContent="space-between">
            
            <Stack direction="row">
            <IconButton
                size="small"
                href={`https://opensea.io/assets/matic/0xd64cf72c458a7bfa351faee0067b4274ecbbe07e/1`}
                target="_blank"
                rel="noreferrer"
              >
                 <Box
                  component="img"
                  src={openseaLogoBlue}
                  alt="Trade on Opensea"
                  loading="lazy"
                  sx={{ width: '24px' }}
                />
              </IconButton>
            </Stack>
          </Stack>
          </CardActions>
        </StyledCard>
              </>           
            </Grid>
        )})}
      

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingYachts}
        onClick={() => setLoadingYachts(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  )
}
