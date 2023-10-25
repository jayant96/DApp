
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
import looksrareIconGreen from '../../shared_assets/looks-green.svg'
import coinbaseNftIcon from '../../shared_assets/coinbase-nft.png'
import rarityToolsIcon from '../../shared_assets/rarityTools.png'
import StatsCard from './StatsCard'
import PleaseConnectMsg from './PleaseConnectMsg'
import YachtName from '../yachtCard/YachtName'
import FullscreenBackdrop from '../FullscreenBackdrop'

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



export default function OgYachts(props) {

  const { session, authenticated } = useAuth();
  const [nftBalances, setNftBalances] = useState([]);
  const [ marketValue, setMarketValue ] = useState([]);
  const [ openSeaValue, setOpenSeaValue ] = useState([]);
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const showDetails = (nft) => {
    // setDetailsOpen(true)
    navigate(nft.tokenId, {state: { nft }});
  }
  const navigate = useNavigate();

   const [loadingYachts, setLoadingYachts] = useState(false)
 

  useEffect(() => {
    if(authenticated){
      axios.get('https://m59jtciqre.execute-api.us-east-1.amazonaws.com/getGenesisNfts', {
        params:{ address: session.address,
        },
       })
       .then(({data}) => {
         // Handle the response data
         setNftBalances(data);
         console.log('Genesis Data:', data)
       }).catch((error) => {
         // Handle errors
         console.error(error);
       });
    }
  },[authenticated, session.address])

  useEffect(() => {
      axios.get('https://m59jtciqre.execute-api.us-east-1.amazonaws.com/getMarketValue', {
        params:{ address: '0x24d0cbD0D5D7b50212251c5dc7cb810E7aF71F6a',
        },
       })
       .then(({data}) => {
         // Handle the response data
         setMarketValue(data);
       }).catch((error) => {
         // Handle errors
         console.error(error);
       });
    }, [])

    useEffect(() => {
      const options = {method: 'GET', headers: {'X-API-KEY': '7ce63c8e73cb44b2aff4bb6d4dc15d84'}};

      fetch('https://api.opensea.io/api/v1/collection/ape-harbour-yachts/stats', options)
      .then(response => response.json())
      .then(response => setOpenSeaValue(response))
      .catch(err => console.error(err));

      console.log('Floor Price ', openSeaValue.stats);
    }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} marginTop={isMobile ? 15 : 2}>
        <Typography variant="h4">Genesis Yachts Data</Typography>
      </Grid>

      {authenticated ? (
  openSeaValue && openSeaValue.stats ? (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <StatsCard
        caption="Floor Price on Opensea"
        value={openSeaValue.stats.floor_price}
      />
    </Grid>
  ) : (
    <FullscreenBackdrop open={!openSeaValue?.stats} />
  )
) : null}


      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <StatsCard
          caption="Total Yachts"
          value={marketValue.total_supply}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <StatsCard
          caption="Number of Owners"
          value={marketValue.num_owners}
        />
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
                href={`https://opensea.io/assets/ethereum/0x24d0cbD0D5D7b50212251c5dc7cb810E7aF71F6a/${nft.tokenId}`}
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
              <IconButton
                size="small"
                href={`https://looksrare.org/collections/0x24d0cbD0D5D7b50212251c5dc7cb810E7aF71F6a/${nft.tokenId}`}
                target="_blank"
                rel="noreferrer"
              >
                <Box
                  component="img"
                  src={looksrareIconGreen}
                  alt="Trade on Looksrare"
                  loading="lazy"
                  sx={{ width: '24px' }}
                />
              </IconButton>
              <IconButton
                size="small"
                href={`https://nft.coinbase.com/nft/ethereum/0x24d0cbD0D5D7b50212251c5dc7cb810E7aF71F6a/${nft.tokenId}`}
                target="_blank"
                rel="noreferrer"
              >
                <Box
                  component="img"
                  src={coinbaseNftIcon}
                  alt="Trade on Coinbase NFT"
                  loading="lazy"
                  sx={{ width: '24px' }}
                />
              </IconButton>
              <IconButton
                size="small"
                href={`https://rarity.tools/ape-harbour-yachts/view/${nft.tokenId}`}
                target="_blank"
                rel="noreferrer"
                >
                <Box
                  component="img"
                  src={rarityToolsIcon}
                  alt="View on rarity.tools"
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
