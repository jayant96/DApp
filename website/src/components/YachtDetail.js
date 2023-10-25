import * as React from 'react'
import {
  Box,
  Button,
  Card,
  CardHeader,
  FormControlLabel,
  FormGroup,
  Link,
  Grid,
  IconButton,
  Stack,
  Switch,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import abis from '../contract_abis/mainnetAbis.json'
import ah_background from '../ocean_small.jpg'
import { useParams, useLocation } from 'react-router-dom'

import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import OGYachtNameChangeDialog from './yachtCard/OGYachtNameChangeDialog'
import FullscreenBackdrop from './FullscreenBackdrop'
import PleaseConnectMsg from './OgYachts/PleaseConnectMsg'
import { useAuth } from './AuthContext'

export default function YachtDetail() {

  const { session, authenticated } = useAuth()
  const { Moralis } = useMoralis()
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
  const httpUrl = ipfsUrl 
      ? ipfsUrl.replace(
          "ipfs://", 
          "https://apeharbour.mypinata.cloud/ipfs/"
        ) + "?pinataGatewayToken=DpUkFkY4XM34Nwun1APLX8jozT9nY5J-DAxq5tK141A-BczLnktEeq7GaPAbwTDF"
      : null;

  const params = useParams()
  //const { tokenId } = params
  const yacht3D = `https://apeharbourapi-apeharbour-destinationimagesbucket7-qt2gs4gedfk5.s3.amazonaws.com/3D_Yachts/${String(
    tokenId,
  ).padStart(4, '0')}.glb`
  console.log('yacht3D path:', yacht3D)

  const Web3Api = useMoralisWeb3Api()

  const [nameChangeDialogOpen, setNameChangeDialogOpen] = React.useState(false)
  const [backdropActive, setBackdropActive] = React.useState(false)
  const [threeDModelActive, setThreeDModelActive] = React.useState(false)

  const handle3DActive = (event) => {
    setThreeDModelActive(event.target.checked)
  }


  const openNameChangeDialog = () => {
    setNameChangeDialogOpen(true)
  }

  const handleChangeName = async (newName) => {
    const options = {
      contractAddress: abis.contracts.ApeHarbourYachts.address,
      functionName: 'setName',
      abi: abis.contracts.ApeHarbourYachts.abi,
      params: {
        _tokenId: tokenId,
        _name: newName,
      },
    }

    console.log('Changing name for', tokenId, 'to', newName)
    const web3Provider = await Moralis.enableWeb3()
    setNameChangeDialogOpen(false)
    setBackdropActive(true)

    Moralis.executeFunction(options)
      .then((tx) => {
        console.log('Tx hash:', tx.hash)
        return tx.wait()
      })
      .then((receipt) => {
        console.log(
          'Tx',
          receipt.transactionHash,
          'has been mined in block',
          receipt.blockNumber,
        )

        const resyncOptions = {
          address: abis.contracts.ApeHarbourYachts.address,
          token_id: tokenId,
          flag: 'uri',
        }

        return Web3Api.token.reSyncMetadata(resyncOptions)
      })
      .then((resyncResponse) => {
        console.log(resyncResponse)
        setName(newName)
        setBackdropActive(false)
      })
      .catch(console.log)
  }

  const handleHDDownload = async (key) => {
    // const url = 'https://lgmxnzu6lj.execute-api.us-east-1.amazonaws.com/prod/highres-yachts/' + key
    const url =
      'https://xr21gnk28f.execute-api.us-east-1.amazonaws.com/dev/yachts/' +
      key +
      '/highRes'
      
    setBackdropActive(true)

    const imgUrl = await fetch(url, { mode: 'cors' })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data.url
      })

      setBackdropActive(false)

    window.open(imgUrl, '_blank').focus()
  }

  
  return (
    <Grid>{authenticated ? (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} marginTop={isMobile ? 15 : 2}>
          <Typography variant="h4" gutterBottom>
            {name}
            <IconButton
              onClick={openNameChangeDialog}
              color="secondary"
              // disabled={!selfOwned}
            >
              <FontAwesomeIcon icon={faPenToSquare} size="sm" />
            </IconButton>
          </Typography>
          { authenticated && (
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
            )}
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          {!threeDModelActive && (
            <Box
              component="img"
              src={httpUrl}
              alt={name}
              loading="lazy"
              sx={{ width: '100%' }}
            />
          )}

          {threeDModelActive && (
            <model-viewer
              alt={name}
              src={yacht3D}
              poster={image}
              seamless-poster
              shadow-intensity="1"
              camera-controls
              enable-pan
              autoplay
              // ar
              // exposure="2"
              neutral
              style={{
                width: 'inherit',
                height: '1024px',
              }}
            />
          )}
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={threeDModelActive}
                      onChange={handle3DActive}
                      // disabled={!selfOwned}
                    />
                  }
                  label="3D model"
                />
              </FormGroup>
            </Grid>

            
            <Grid item xs={12}>
              <Stack spacing={2} alignItems="flex-start">
                <Typography variant="h5" gutterBottom>
                  Yacht Naming
                </Typography>
                <Button
                  onClick={openNameChangeDialog}
                  color="secondary"
                  variant="outlined"
                  // disabled={!selfOwned}
                >
                  Name Your Yacht
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={2}>
                <Typography variant="h5" gutterBottom>
                  2D Downloads
                </Typography>
                <Stack spacing={2} direction="row">
                  <Button
                    color="secondary"
                    variant="outlined"
                    // disabled={!selfOwned}
                    target="_blank" rel="noopener noreferrer"
                    href={`https://lgmxnzu6lj.execute-api.us-east-1.amazonaws.com/prod/twitter-banner/${tokenId}`}
                  >
                    Twitter Banner
                  </Button>

                  <Button
                    color="secondary"
                    variant="outlined"
                    // disabled={!selfOwned}
                    target="_blank" rel="noopener noreferrer"
                    href={`https://lgmxnzu6lj.execute-api.us-east-1.amazonaws.com/prod/transparent-background/${tokenId}`}
                  >
                    Transparent Background
                  </Button>

                  <Button
                    color="secondary"
                    variant="outlined"
                    // disabled={!selfOwned}
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => handleHDDownload(tokenId)}
                     href={`https://apeharbourapi-apeharbour-destinationimagesbucket7-qt2gs4gedfk5.s3.amazonaws.com/yachts/highRes/${tokenId}.png`}
                  >
                    High Resolution (4k)
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={2}>
                <Typography variant="h5" gutterBottom>
                  3D Downloads
                </Typography>
                <Stack spacing={2} direction="row">
                  <Button
                    color="secondary"
                    variant="outlined"
                    // disabled={!selfOwned}
                    href={yacht3D}
                  >
                    GLB File
                  </Button>

                  <Button
                    color="secondary"
                    variant="outlined"
                    // disabled={!selfOwned}
                    href={yacht3D.slice(0, -3).concat('fbx')}
                  >
                    FBX File
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Traits
              </Typography>
            </Grid>
            {attributes.map((a, index) => (
              <Grid
                item
                xs={3}
                md={6}
                lg={4}
                key={[tokenId, a.trait_type, a.value].join('-')}
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

      <OGYachtNameChangeDialog
        open={nameChangeDialogOpen}
        handleClose={setNameChangeDialogOpen}
        handleChangeName={handleChangeName}
      />

      <FullscreenBackdrop open={backdropActive} />
    </React.Fragment>) : (<PleaseConnectMsg height='120px' />)} </Grid>
  )
}
