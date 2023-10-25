import * as React from 'react'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { useAuth } from '../AuthContext'
import axios from 'axios'

export default function SuperyachtNameChangeDialog(props) {
  const { isAuthenticated, user } = useMoralis()
  const { authenticated, session} = useAuth()

  const Web3Api = useMoralisWeb3Api()

  const closeDialog = () => {
    props.handleClose(false)
  }

  const [newYachtName, setNewYachtName] = React.useState('')
  const [ogYachts, setOgYachts] = React.useState([])
  const [yachtToBurn, setYachtToBurn] = React.useState('')
  const [nameError, setNameError] = React.useState(false)
  const [nameErrorMsg, setNameErrorMsg] = React.useState('')
  const [namingEnabled, setNamingEnabled] = React.useState(false)
  const [acknowledged, setAcknowledged] = React.useState(false)

  const checkNamingEnabled = (name, burnYacht, accepted) => {
    if (burnYacht === '') {
      return false
    }

    if (!accepted) {
      return false
    }

    const format = /^[a-z0-9!§%&()=?*+#-_.:,;<> ]*$/i
    if (!format.test(name)) {
      return false
    }
    if (name === props.name) {
      return false
    }
    if (name === '') {
      return false
    }

    return true
  }

  const handleAcknowledgeChange = (e) => {
    setAcknowledged(e.target.checked)

    console.log('Flipping acknowledged', newYachtName, yachtToBurn, e.target.checked)
    setNamingEnabled(
      checkNamingEnabled(newYachtName, yachtToBurn, e.target.checked),
    )
  }

  const handleChange = (e) => {
    const format = /^[a-z0-9!§%&()=?*+#-_.:,;<> ]*$/i

    setNewYachtName(e.target.value)

    if (!format.test(e.target.value)) {
      setNameError(true)
      setNameErrorMsg(
        'Name can only inlcude characters, numbers, and some special characters: !§$%&/()=?*+#-_.:,;<> ',
      )
      setNamingEnabled(
        checkNamingEnabled(e.target.value, yachtToBurn, acknowledged),
      )
      return
    }

    if (e.target.value === props.name) {
      setNameError(true)
      setNameErrorMsg('Name cannot be the same as the existing name')
      setNamingEnabled(
        checkNamingEnabled(e.target.value, yachtToBurn, acknowledged),
      )
      return
    }

    if (e.target.value === '') {
      setNameError(true)
      setNameErrorMsg('Name cannot be empty')
      setNamingEnabled(
        checkNamingEnabled(e.target.value, yachtToBurn, acknowledged),
      )
      return
    }

    setNamingEnabled(
      checkNamingEnabled(e.target.value, yachtToBurn, acknowledged),
    )
    setNameError(false)
    setNameErrorMsg('')
  }

  const handleChangeBurnYacht = (event) => {
    setYachtToBurn(event.target.value)
    setNamingEnabled(
      checkNamingEnabled(newYachtName, event.target.value, acknowledged),
    )
    console.log('New yacht to burn:', event.target.value)
  }

  const handleOK = () => {
    console.log('Setting new name to', newYachtName)
    props.handleChangeName(newYachtName, yachtToBurn)
  }

  const fetchNFTsForContract = async () => {
    console.log('Fetching yachts for', session.address)
    // const options = {
    //   chain: 'eth',
    //   address: user.get('ethAddress'),
    //   token_address: contract,
    // }
    // Web3Api.account
    //   .getNFTsForContract(options)

    //   .then(async (nfts) => {
    //     let allNFTs = nfts || []

    //     while (nfts.next) {
    //       nfts = await nfts.next()
    //       allNFTs.result.push(...nfts.result)
    //     }
    //     return allNFTs
    //   })
    //   .then((allNFTs) => {
    //     allNFTs.result = allNFTs.result.sort((a, b) => a.token_id - b.token_id)
    //     setOgYachts(allNFTs)
    //   })
    //   .catch((e) => {
    //     console.log(e)
    //   })

      axios.get('https://m59jtciqre.execute-api.us-east-1.amazonaws.com/getGenesisNftsClaimName', {
        params:{ address: session.address,
        },
       })
       .then(({data}) => {
        // Handle the response data
        console.log('Final Length of allNFTs', data.result.length)
        setOgYachts(data)
        console.log('Genesis Data: ', data);
      }).catch((error) => {
         // Handle errors
         console.error(error);
       })
  }

  const getDisplayName = (y) => {
    const { metadata, token_id } = y
    const { name } = JSON.parse(metadata)

    if (name === `Yacht ${token_id}`) {
      return name
    }

    return `${name} (#${token_id})`
  }

  React.useEffect(() => {
    if (!authenticated) {
      console.log('Unsetting ogYachts')
      setOgYachts([])
    } else {
      console.log('Loading og yachts')
      fetchNFTsForContract()
    }
  }, [authenticated])

  return (
    <Dialog open={props.open} onClose={closeDialog}>
      <DialogTitle>
        Name Superyacht?
        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>

        <Box>

        <Typography gutterBottom>
          You can set your Superyacht's name directly on-chain. Naming your
          Superyacht requires burning one of the genesis yachts. A superyacht
          can only be named once and its name is must be unique. No other
          superyacht can have the same name. The name will display on the marketplaces (like Opensea or Looksrare)
          once you refresh their metadata. There are two transactions:
        </Typography>
        <List dense>
          <ListItem key='Step 1'>
            <ListItemText>
              1. <strong>Approve</strong> the smart contract to burn a genesis yacht.
            </ListItemText>
          </ListItem>
          <ListItem key='Step 2'>
            <ListItemText>
              2. <strong>Name</strong> the superyacht and burn a genesis yacht.
            </ListItemText>
          </ListItem>
        </List>
        {/* <Typography gutterBottom>
          
        </Typography> */}
        </Box>
        <TextField
          autoFocus
          margin="dense"
          id="superyachtName"
          label="New Yacht Name"
          type="text"
          color="secondary"
          error={nameError}
          helperText={nameErrorMsg}
          fullWidth
          value={newYachtName}
          variant="standard"
          onChange={handleChange}
        />

        <FormControl variant="standard" sx={{ minWidth: 240 }}>
          <InputLabel id="yacht-to-burn-label" color="secondary">
            Genesis yacht to burn
          </InputLabel>
          <Select
            labelId="yacht-to-burn-label"
            id="yacht-to-burn-select"
            value={yachtToBurn}
            onChange={handleChangeBurnYacht}
            label="Yacht to Burn"
            color='secondary'
          >
            {ogYachts &&
              ogYachts.result &&
              ogYachts.result.map((yacht) => (
                <MenuItem value={yacht.token_id} key={`Yacht #${yacht.token_id}`}>
                  {getDisplayName(yacht)}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              // disabled={namedAlready}
              value={acknowledged}
              onChange={handleAcknowledgeChange}
              color='secondary'
            />
          }
          label="I acknowledge that naming will burn a genesis yacht. Once a superyacht has been named it can't be undone."
        />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button color="secondary" onClick={handleOK} disabled={!namingEnabled}>
          Change Name
        </Button>
      </DialogActions>
    </Dialog>
  )
}
