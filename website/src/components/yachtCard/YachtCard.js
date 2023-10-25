import * as React from 'react'
import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Link,
  Slide,
  Stack,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import openseaLogoBlue from '../../shared_assets/opensea_Logomark-Blue.svg'
import looksrareIconGreen from '../../shared_assets/looks-green.svg'
import coinbaseNftIcon from '../../shared_assets/coinbase-nft.png'
import rarityToolsIcon from '../../shared_assets/rarityTools.png'
import YachtName from './YachtName'
import OGYachtNameChangeDialog from './OGYachtNameChangeDialog'
import { useNavigate } from 'react-router-dom'
import { CONSTANTS } from '../../constants.mjs'

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


export default function YachtCard(props) {
  const [nameChangeDialogOpen, setNameChangeDialogOpen] = useState(false)

  const getImage = (y) => {
    const { metadata } = y
    const parsed = JSON.parse(metadata)
    return `https://apeharbour.mypinata.cloud/ipfs/${parsed.image.slice(7)}`
  }

  const getName = (y) => {
    const { metadata } = y
    const parsed = JSON.parse(metadata)
    return parsed.name
  }

  const getId = (y) => {
    return y.token_id
  }

  const getAttributes = (y) => {
    const { metadata } = y
    const parsed = JSON.parse(metadata)
    const { attributes } = parsed
    return attributes
  }

  const showDetails = (y) => {
    // setDetailsOpen(true)
    navigate(y.token_id)
  }
  const navigate = useNavigate()



  return (
    <React.Fragment>
      <StyledCard sx={{ position: 'relative' }}>
        <CardActionArea onClick={() => showDetails(props.yacht)}>
          <StyledCardMedia
            component="img"
            image={getImage(props.yacht)}
            alt="Yacht"
          />
          <Chip
            label={`№${getId(props.yacht)}`}
            sx={{ position: 'absolute', right: 8, top: 8 }}
            color="primary"
          />
          <CardContent sx={{ paddingBottom: 0 }}>
            <YachtName yacht={props.yacht} />
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Stack direction="row" spacing={2} sx={{ width:'100%'}} justifyContent="space-between">
            
            <Stack direction="row">
              <IconButton
                size="small"
                href={`https://opensea.io/assets/${props.yacht.token_address}/${props.yacht.token_id}`}
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
                href={`https://looksrare.org/collections/${props.yacht.token_address}/${props.yacht.token_id}`}
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
                href={`https://nft.coinbase.com/nft/ethereum/${props.yacht.token_address}/${props.yacht.token_id}`}
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
              {props.yacht.token_address.toLowerCase() == CONSTANTS.ogyachts.token_address.toLowerCase() && (

                <IconButton
                size="small"
                href={`https://rarity.tools/${props.rarityToolsCollection}/view/${props.yacht.token_id}`}
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
                  )}
            </Stack>
          </Stack>
        </CardActions>
      </StyledCard>

      <OGYachtNameChangeDialog
        open={nameChangeDialogOpen}
        handleClose={setNameChangeDialogOpen}
      />
    </React.Fragment>
  )
}
