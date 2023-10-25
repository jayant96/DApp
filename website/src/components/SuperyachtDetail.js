import * as React from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  IconButton,
  Link,
  Snackbar,
  Stack,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { useParams, useLocation } from 'react-router-dom'

import abis from '../contract_abis/mainnetAbis.json'
import ahsyAbi from '../contract_abis/mainnet_SuperyachtToken.json'

import {
  useMoralis,
  useMoralisWeb3Api,
} from 'react-moralis'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import SuperyachtNameChangeDialog from './yachtCard/SuperyachtNameChangeDialog'
import FullscreenBackdrop from './FullscreenBackdrop'
import PleaseConnectMsg from './OgYachts/PleaseConnectMsg'
import { useAuth } from './AuthContext'

export default function YachtDetail(props) {
  const {
    authenticate,
    isAuthenticated,
    isInitialized,
    isAuthenticating,
    user,
    account,
    logout,
    Moralis,
  } = useMoralis()

  const { authenticated, session } = useAuth() 

  const location = useLocation()
  const nft = location.state?.nft
  
  if(!nft) {
    return <PleaseConnectMsg height='120px' />;
  }

  const { tokenId,  metadata} = nft
  const { name, attributes, image } = metadata
  const ipfsUrl = nft.metadata && nft.metadata.image;
const httpUrl = ipfsUrl 
    ? ipfsUrl.replace(
        "ipfs://", 
        "https://apeharbour.mypinata.cloud/ipfs/"
      ) + "?pinataGatewayToken=DpUkFkY4XM34Nwun1APLX8jozT9nY5J-DAxq5tK141A-BczLnktEeq7GaPAbwTDF"
    : null;

  const params = useParams()
 // const { tokenId } = params

  const Web3Api = useMoralisWeb3Api()
  const ethers = Moralis.web3Library

  const [nameChangeDialogOpen, setNameChangeDialogOpen] = React.useState(false)
  const [backdropActive, setBackdropActive] = React.useState(false)
  const [snackbarVisible, setSnackbarVisible] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const openNameChangeDialog = () => {
    setNameChangeDialogOpen(true)
  }

  const handleTransparentBgDownload = async (key) => {
    const url =
      'https://xr21gnk28f.execute-api.us-east-1.amazonaws.com/dev/superyachts/' +
      key +
      '/transparent'
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

  const handleHDDownload = async (key) => {
    const url =
      'https://xr21gnk28f.execute-api.us-east-1.amazonaws.com/dev/superyachts/' +
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

  const handleSuperyachtNameChange = async (newName, genesisBurnYacht) => {
    console.log(
      'Setting name for superyacht',
      tokenId,
      'to',
      newName,
      'and burning genesis yacht',
      genesisBurnYacht,
    )

    const web3Provider = await Moralis.enableWeb3()

    // check if name is already taken
    const hashOfName = ethers.utils.id(newName.toLowerCase())
    console.log({ hashOfName })

    const nameTakenOptions = {
      contractAddress: ahsyAbi.address,
      abi: ahsyAbi.abi,
      functionName: 'nameTaken',
      params: {
        '': hashOfName,
      },
    }

    let nameTaken = false
    await Moralis.executeFunction(nameTakenOptions)
      .then((result) => (nameTaken = result))
      .catch((error) => {
        console.log('Error', error)
        nameTaken = true
      })

    console.log({ nameTaken })

    if (nameTaken) {
      setErrorMessage('Name has already been taken')
      console.log('Name taken error')
      setSnackbarVisible(true)
      return
    }

    // check if contract is approved

    const isApprovedOptions = {
      contractAddress: abis.contracts.ApeHarbourYachts.address,
      abi: abis.contracts.ApeHarbourYachts.abi,
      functionName: 'isApprovedForAll',
      params: {
        owner: session.address,
        operator: ahsyAbi.address,
      },
    }

    const approved = await Moralis.executeFunction(isApprovedOptions)
    console.log({ approved })

    if (!approved) {
      setBackdropActive(true)
      const setApprovalForAllOptions = {
        contractAddress: abis.contracts.ApeHarbourYachts.address,
        functionName: 'setApprovalForAll',
        abi: abis.contracts.ApeHarbourYachts.abi,
        params: {
          operator: ahsyAbi.address,
          approved: true,
        },
      }

      await Moralis.executeFunction(setApprovalForAllOptions)
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
        })
        .catch((error) => {
          console.log(error)
          setBackdropActive(false)
          setErrorMessage('Approval failed, see console for details')
          setSnackbarVisible(true)
        })
    }

    const approvedAfter = await Moralis.executeFunction(isApprovedOptions)
    console.log({ approvedAfter })
    console.log(
      ahsyAbi.address,
      'is approved for',
      session.address,
      ':',
      approvedAfter,
    )

    if (approvedAfter) {
      setBackdropActive(true)

      const setNameOptions = {
        contractAddress: ahsyAbi.address,
        abi: ahsyAbi.abi,
        functionName: 'setName',
        params: {
          _yachtId: parseInt(tokenId),
          _yachtName: newName,
          _ogYachtToBurn: parseInt(genesisBurnYacht),
        },
      }

      Moralis.executeFunction(setNameOptions)
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
            address: ahsyAbi.address,
            token_id: tokenId,
            flag: 'uri',
          }

          return Web3Api.token.reSyncMetadata(resyncOptions)
        })
        .then((resyncResponse) => {
          console.log(resyncResponse)
          setName(newName)
          setBackdropActive(false)
          setNameChangeDialogOpen(false)
        })
        .catch((error) => {
          console.log(error)
          setBackdropActive(false)
          setErrorMessage('Approval failed, see console for details')
          setSnackbarVisible(true)
        })
    }
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

  
  return (
    <Grid>
    {authenticated ? (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} marginTop={isMobile ? 15 : 2}>
          <Typography variant="h4" gutterBottom>
            {name}
            <IconButton
              onClick={openNameChangeDialog}
              color="secondary"
              //disabled={!selfOwned}
            >
              <FontAwesomeIcon icon={faPenToSquare} size="sm" />
            </IconButton>
          </Typography>
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
                Yacht Naming
              </Typography>
              <Button
                onClick={openNameChangeDialog}
                color="secondary"
                variant="outlined"
                //disabled={!selfOwned}
              >
                Name Your Yacht
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Downloads
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <Button
                  color="secondary"
                  variant="outlined"
                 // disabled={!selfOwned}
                  onClick={() => handleTransparentBgDownload(tokenId)}
                >
                  Transparent Background
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                 // disabled={!selfOwned}
                  onClick={() => handleHDDownload(tokenId)}
                >
                  High Resolution (4k)
                </Button>
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
            ))}

          </Grid>
        </Grid>
      </Grid>

      <SuperyachtNameChangeDialog
        open={nameChangeDialogOpen}
        handleClose={setNameChangeDialogOpen}
        handleChangeName={handleSuperyachtNameChange}
        ogYachtsContract={props.ogYachtsContract}
        tokenId={tokenId}
        name={name}
      />

      <FullscreenBackdrop open={backdropActive} />

      <Snackbar
        open={snackbarVisible}
        autoHideDuration={5000}
        onClose={() => setSnackbarVisible(false)}
      >
        <Alert
          onClose={() => setSnackbarVisible(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>) : (<PleaseConnectMsg height='120px' />)} </Grid>
  )
}
