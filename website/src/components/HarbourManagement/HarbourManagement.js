import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Link,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'

import {styled} from '@mui/system'


import * as React from 'react'
import ahy_img from './ogyachts.png'
import ahd_img from './surfboards.png'
import ahsy_img from './superyachts.png'
import ahsd_img from './sandboxyachts.png'
import dcl_hoodie from './dclHoodies.png'
import tsb_piers from './tsbAssets.png'
import hoodieBlack from './hoodies.png'

import openseaLogoBlue from '../../shared_assets/opensea_Logomark-Blue.svg'
import looksrareIconGreen from '../../shared_assets/looks-green.svg'
import coinbaseNftIcon from '../../shared_assets/coinbase-nft.png'
import etherscanIcon from '../../shared_assets/etherscan-logo-circle.svg'
import polygonLogo from '../../shared_assets/polygon.svg'
import tsbShopIcon from '../../shared_assets/tsb_shop-icon.svg'
import rarityToolsIcon from '../../shared_assets/rarityTools.png'

import { CONSTANTS } from '../../constants.mjs'

const StyledCardMedia = styled(CardMedia)`
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

const StyledCard = styled(Card)`
  transition: border 0.3s ease-in-out;
  border: 2px solid transparent;

  &:hover {
    border: 2px solid rgba(7, 240, 240, 0.5); // Change the color to your preferred highlight color
  }
`;



export default function HarbourManagement(props) {

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Grid container spacing={2} marginTop={isMobile ? 15 : 2}>
      <Grid item xs={12}>
        <Typography variant="h4">Yacht Collections</Typography>
      </Grid>

      <Grid container spacing={0.5} item xs={12} sm={6} md={4} lg={3} sx={{alignItems:'stretch'}}>
        <StyledCard>
          <CardActionArea href="/ogyachts">
            <StyledCardMedia component="img" image={ahy_img} alt="Yacht" />
            <CardContent>
              <Typography gutterBottom variant="h5">
                Genesis Yachts
              </Typography>
              <Typography variant='body2'>
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
                </Link>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton
              size="small"
              href={`https://etherscan.io/address/${CONSTANTS.ogyachts.token_address}`}
              target="_blank"
              rel="noreferrer"
            >
              <Box
                component="img"
                src={etherscanIcon}
                alt="View on Etherscan"
                loading="lazy"
                sx={{ width: '24px' }}
              />
            </IconButton>
            <IconButton
              size="small"
              href={`https://opensea.io/collection/${CONSTANTS.ogyachts.os_slug}`}
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
              href={`https://looksrare.org/collections/${CONSTANTS.ogyachts.token_address}`}
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
              href={`https://nft.coinbase.com/collection/ethereum/${CONSTANTS.ogyachts.token_address}`}
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
              href={`https://rarity.tools/${CONSTANTS.ogyachts.rarity_tools}`}
              target="_blank"
              rel="noreferrer"
            >
              <Box
                component="img"
                src={rarityToolsIcon}
                alt="Check on rarity.tools"
                loading="lazy"
                sx={{ width: '24px' }}
              />
            </IconButton>
          </CardActions>
        </StyledCard>
      </Grid>

      <Grid container spacing={0.5} item xs={12} sm={6} md={4} lg={3}>
        <StyledCard>
          <CardActionArea href="/superyachts">
            <StyledCardMedia component="img" image={ahsy_img} alt="Superyacht" />
            <CardContent>
              <Typography gutterBottom variant="h5">
                Superyachts
              </Typography>
              <Typography variant='body2'>
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
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton
              size="small"
              href={`https://etherscan.io/address/${CONSTANTS.superyachts.token_address}`}
              target="_blank"
              rel="noreferrer"
            >
              <Box
                component="img"
                src={etherscanIcon}
                alt="View on Etherscan"
                loading="lazy"
                sx={{ width: '24px' }}
              />
            </IconButton>
            <IconButton
              size="small"
              href={`https://opensea.io/collection/${CONSTANTS.superyachts.os_slug}`}
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
              href={`https://looksrare.org/collections/${CONSTANTS.superyachts.token_address}`}
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
              href={`https://nft.coinbase.com/collection/ethereum/${CONSTANTS.superyachts.token_address}`}
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
          </CardActions>
        </StyledCard>
      </Grid>
      

      <Grid container spacing={0.5} item xs={12} sm={6} md={4} lg={3}  sx={{alignItems:'stretch'}}>
      <StyledCard>
          <CardActionArea href="/sandboxyachts">
            <StyledCardMedia component="img" image={ahsd_img} alt="Sandboxyacht" />
            <CardContent>
              <Typography gutterBottom variant="h5">
              Sandbox Yachts
              </Typography>
              <Typography variant='body2'>
                The smart contract is deployed on Ethereum at {' '}
                <Link
                  href={`https://etherscan.io/address/${CONSTANTS.sandboxyachts.token_address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  
                  {CONSTANTS.sandboxyachts.token_address}
            

                  
                </Link>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton
              size="small"
              href={`https://etherscan.io/address/${CONSTANTS.sandboxyachts.token_address}`}
              target="_blank"
              rel="noreferrer"
            >
              <Box
                component="img"
                src={etherscanIcon}
                alt="View on Etherscan"
                loading="lazy"
                sx={{ width: '24px' }}
              />
            </IconButton>
            <IconButton
              size="small"
              href={`https://opensea.io/collection/${CONSTANTS.sandboxyachts.os_slug}?search[query]=ape%20harbour`}
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
              href="https://www.sandbox.game/en/nft-search/?s=ape%20harbour"
              target="_blank"
              rel="noreferrer"
            >
              <Box
                component="img"
                src={tsbShopIcon}
                alt="View on Sandbox Marketplace"
                loading="lazy"
                sx={{ width: '24px' }}
              />
            </IconButton>
          </CardActions>
        </StyledCard>
      </Grid>
      

      <Grid item xs={12} mt={2}>
        <Typography variant="h4">Equipment</Typography>
      </Grid>


      <Grid container spacing={0.5} item xs={12} sm={6} md={4} lg={3}>
        <StyledCard>
          <CardActionArea href="/surfboards">
            <StyledCardMedia component="img" image={ahd_img} alt="Surfboard"/>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Surfboards
              </Typography>
              <Typography variant='body2'>
                The smart contract is deployed on Ethereum at{' '}
                <Link
                  href={`https://etherscan.io/enslookup-search?search=${CONSTANTS.surfboards.ens_domain}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {CONSTANTS.surfboards.ens_domain}
                </Link>{' '}
                at{' '}
                <Link
                  href={`https://etherscan.io/address/${CONSTANTS.surfboards.token_address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {CONSTANTS.surfboards.token_address}
                </Link>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton
              size="small"
              href={`https://etherscan.io/address/${CONSTANTS.surfboards.token_address}`}
              target="_blank"
              rel="noreferrer"
            >
              <Box
                component="img"
                src={etherscanIcon}
                alt="View on Etherscan"
                loading="lazy"
                sx={{ width: '24px' }}
              />
            </IconButton>
            <IconButton
              size="small"
              href={`https://opensea.io/collection/${CONSTANTS.surfboards.os_slug}`}
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
              href={`https://looksrare.org/collections/${CONSTANTS.surfboards.token_address}`}
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
              href={`https://nft.coinbase.com/collection/ethereum/${CONSTANTS.surfboards.token_address}`}
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
          </CardActions>
        </StyledCard>
      </Grid>

      <Grid container spacing={0.5} item xs={12} sm={6} md={4} lg={3}>
        <StyledCard>
          <CardActionArea href="/hoodies">
            <StyledCardMedia component="img" image={hoodieBlack} alt="2D Hoodie" />
            <CardContent>
              <Typography gutterBottom variant="h5">
                2D Hoodies
              </Typography>
              <Typography variant='body2'>
                The smart contract is deployed on Polygon at{' '}
                <Link
                  href={`https://polygonscan.com/token/${CONSTANTS.hoodies.token_address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {CONSTANTS.hoodies.ens_domain}
                </Link>{' '}
                at{' '}
                <Link
                  href={`https://polygonscan.com/address/${CONSTANTS.hoodies.token_address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {CONSTANTS.hoodies.token_address}
                </Link>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton
              size="small"
              href={`https://polygonscan.com/address/${CONSTANTS.hoodies.token_address}`}
              target="_blank"
              rel="noreferrer"
            >
              <Box
                component="img"
                src={polygonLogo}
                alt="View on Polygonscan"
                loading="lazy"
                sx={{ width: '24px' }}
              />
            </IconButton>
            <IconButton
              size="small"
              href={`https://opensea.io/collection/${CONSTANTS.hoodies.os_slug}`}
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
          </CardActions>
        </StyledCard>
      </Grid>

      <Grid container spacing={0.5} item xs={12} sm={6} md={4} lg={3}>
        <StyledCard>
          <CardActionArea href="/dclhoodies">
            <StyledCardMedia
              component="img"
              image={dcl_hoodie}
              alt="Decentraland Hoodie"
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                Decentraland Wearables
              </Typography>
              <Typography variant='body2'>
                The smart contract is deployed on Polygon at{' '}
                <Link
                  href={`https://polygonscan.com/address/${CONSTANTS.dclHoodies.token_address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {CONSTANTS.dclHoodies.token_address}
                </Link>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton
              size="small"
              href={`https://polygonscan.com/address/${CONSTANTS.dclHoodies.token_address}`}
              target="_blank"
              rel="noreferrer"
            >
              <Box
                component="img"
                src={polygonLogo}
                alt="View on Polygonscan"
                loading="lazy"
                sx={{ width: '24px' }}
              />
            </IconButton>
            <IconButton
              size="small"
              href={`https://opensea.io/assets/matic/${CONSTANTS.dclHoodies.token_address}/${CONSTANTS.dclHoodies.token}`}
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
          </CardActions>
        </StyledCard>
      </Grid>

      <Grid container spacing={0.5}item xs={12} sm={6} md={4} lg={3}>
        <StyledCard>
          <CardActionArea href="/sandboxassets">
            <StyledCardMedia component="img" image={tsb_piers} alt="Sandbox Assets" />
            <CardContent>
              <Typography gutterBottom variant="h5">
                Sandbox Assets
              </Typography>
              <Typography variant='body2'>
                The smart contract is deployed on Ethereum at{' '}
                <Link
                  href={`https://etherscan.io/address/${CONSTANTS.tsbAssets.token_address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {CONSTANTS.tsbAssets.token_address}
                </Link>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton
              size="small"
              href={`https://etherscan.io/address/${CONSTANTS.tsbAssets.token_address}`}
              target="_blank"
              rel="noreferrer"
            >
              <Box
                component="img"
                src={etherscanIcon}
                alt="View on Etherscan"
                loading="lazy"
                sx={{ width: '24px' }}
              />
            </IconButton>
            <IconButton
              size="small"
              href={`https://opensea.io/collection/${CONSTANTS.tsbAssets.os_slug}?search[query]=ape%20harbour`}
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
              href="https://www.sandbox.game/en/nft-search/?s=ape%20harbour"
              target="_blank"
              rel="noreferrer"
            >
              <Box
                component="img"
                src={tsbShopIcon}
                alt="View on Sandbox Marketplace"
                loading="lazy"
                sx={{ width: '24px' }}
              />
            </IconButton>
          </CardActions>
        </StyledCard>
      </Grid>
    </Grid>
  )
}
