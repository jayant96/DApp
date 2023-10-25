import React, { useState, useEffect} from 'react'
import {
  Alert,
  AlertTitle,
  Backdrop,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControlLabel,
  Grid,
  Pagination,
  Paper,
  Stack,
  Typography,
} from '@mui/material'

import { CONSTANTS } from '../constants.mjs'

import abis from '../contract_abis/mainnetAbis.json'
import ahSportsyachtClaimAbi from '../contract_abis/SYClaiming.json'

const TSB_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      { internalType: 'uint256', name: 'data', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
]

import { useMoralis, useMoralisWeb3Api } from 'react-moralis'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import sportsyacht_red from '../shared_assets/sportsyacht_red.png'
import sportsyacht_black from '../shared_assets/sportsyacht_black.png'
import sportsyacht_silver from '../shared_assets/sportsyacht_silver.png'
import fire from '../shared_assets/campfire.svg'
import speedboat from '../shared_assets/motor-powered-boat.png'
import YachtSelectOption from './YachtSelectOption.js'
import { useAuth } from './AuthContext'
import axios from 'axios'

const NUMBER_OF_ITEMS_PER_PAGE = 9

function Fire(props) {
  return (
    <Box
      onClick={props.onClick}
      yachtType={props.yachtType}
      visibility={props.selected ? 'visible' : 'hidden'}
      component="img"
      src={fire}
      sx={{
        '&:hover': {
          cursor: 'pointer',
        },
        width: props.width,
        position: 'absolute',
        left: props.left,
        top: props.top,
      }}
    />
  )
}

function Check(props) {
  return (
    <Stack direction="row" spacing={1}>
      <FontAwesomeIcon
        icon={props.checked ? faCircleCheck : faCircleXmark}
        size="sm"
        color={props.checked ? '#4caf50' : 'primary'}
      />
      <Typography variant="body2">{props.msg}</Typography>
    </Stack>
  )
}

export default function ClaimSportsyacht(props) {
  const { isAuthenticated, user, Moralis, isInitialized } = useMoralis()
  const { authenticated, session} = useAuth()

  const [nftBalances, setNftBalances] = useState([]);
  const remainingID = '36573846584833278925172985243645009649481595570072332284486852001384296880128'

  const [redSelected, setRedSelected] = React.useState(false)
  const [blackSelected, setBlackSelected] = React.useState(false)
  const [silverSelected, setSilverSelected] = React.useState(true)
  const [syColor, setSyColor] = React.useState('silver')
  const [yachts, setYachts] = React.useState({ result: [] })
  const [page, setPage] = React.useState(1)
  const [selectedOgYachts, setSelectedOgYachts] = React.useState([])
  const [acknowledged, setAcknowledged] = React.useState(false)
  const [claimEnabled, setClaimEnabled] = React.useState(false)
  const [backdropActive, setBackdropActive] = React.useState(false)
  const [snackbarVisible, setSnackbarVisible] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [redRemaining, setRedRemaining] = React.useState(0)
  const [blackRemaining, setBlackRemaining] = React.useState(0)
  const [silverRemaining, setSilverRemaining] = React.useState(0)

  // useEffect(() => {
  //   if(authenticated){
  //     axios.get('https://m59jtciqre.execute-api.us-east-1.amazonaws.com/getGenesisNftsClaimName', {
  //       params:{ address: session.address,
  //       },
  //      })
  //      .then(({data}) => {
  //        // Handle the response data
  //        setNftBalances(data);
  //        console.log('Genesis Data: ', data);
  //      }).catch((error) => {
  //        // Handle errors
  //        console.error(error);
  //      });
  //   }
  //   if(yachts){
  //     console.log("Yachts Data is: ", yachts)
  //   }
  // },[authenticated, session.address, yachts])

  // useEffect(() => {
  //   const fetchRemainingSportsyacht = async (types) => {
  //     try {
  //       const response = await axios.post('https://m59jtciqre.execute-api.us-east-1.amazonaws.com/getRemainingSportsyacht', { id:  CONSTANTS.sandboxyachts.assets[types] });
  //       console.log('Silver Sportyacht remaining: ', response.data);
  //     } catch (e) {
  //       setError(e.message);
  //     }
  //   };

  //   fetchRemainingSportsyacht('redSportsyacht');
  // }, [remainingID]);

  const Web3Api = useMoralisWeb3Api()

  const neededOgYachts = new Map()
  neededOgYachts.set('silver', 2)
  neededOgYachts.set('black', 3)
  neededOgYachts.set('red', 4)

  const sportsYachtIds = new Map()
  sportsYachtIds.set('red', CONSTANTS.sandboxyachts.assets.redSportsyacht)
  sportsYachtIds.set('black', CONSTANTS.sandboxyachts.assets.blackSportsyacht)
  sportsYachtIds.set('silver', CONSTANTS.sandboxyachts.assets.silverSportsyacht)

  const START_TS = 1664553600 * 1000 // 2022-09-30T16:00:00UTC
  // const START_TS =    1664528111000 // 8:52

  const startTimePassed = () => {
    return Date.now() > START_TS
  }
  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const handleAcknowledgeChange = (e) => {
    setAcknowledged(e.target.checked)

    console.log('Flipping acknowledged to', e.target.checked)
  }

  // const fetchNFTsForContract = async () => {
  //   console.log('Fetching yachts for', user.get('ethAddress'))
  //   setBackdropActive(true)
  //   const options = {
  //     chain: props.chain,
  //     address: user.get('ethAddress'),
  //     token_address: props.ogYachtsContract,
  //   }

  //   Web3Api.account
  //     .getNFTsForContract(options)
  //     .then(async (nfts) => {
  //       let allNFTs = nfts || []
  //       console.log({ allNFTs })

  //       while (nfts.next) {
  //         nfts = await nfts.next()
  //         allNFTs.result.push(...nfts.result)
  //       }
  //       console.log('Final Length of allNFTs', allNFTs.result.length)
  //       setYachts(allNFTs)
  //     })
  //     .catch((e) => {
  //       false
  //       console.log(e)
  //     })
  //     .finally(() => {
  //       setBackdropActive(false)
  //     })
  // }

  const fetchNFTsForContract = async () => {
    console.log('Fetching yachts for', session.address)
    setBackdropActive(true)
    // const options = {
    //   chain: props.chain,
    //   address: user.get('ethAddress'),
    //   token_address: props.ogYachtsContract,
    // }

    // Web3Api.account
    //   .getNFTsForContract(options)
    //   .then(async (nfts) => {
    //     let allNFTs = nfts || []
    //     console.log({ allNFTs })

    //     while (nfts.next) {
    //       nfts = await nfts.next()
    //       allNFTs.result.push(...nfts.result)
    //     }
    //     console.log('Final Length of allNFTs', allNFTs.result.length)
    //     setYachts(allNFTs)
    //   })
    //   .catch((e) => {
    //     false
    //     console.log(e)
    //   })
    //   .finally(() => {
    //     setBackdropActive(false)
    //   })

      axios.get('https://m59jtciqre.execute-api.us-east-1.amazonaws.com/getGenesisNftsClaimName', {
        params:{ address: session.address,
        },
       })
       .then(({data}) => {
         // Handle the response data
         console.log('Final Length of allNFTs', data.result.length)
         setYachts(data)
         console.log('Genesis Data: ', data);
       }).catch((error) => {
         // Handle errors
         console.error(error);
       })
       .finally(() => {
        setBackdropActive(false)
      });
  }

  const fetchRemaining = async (type) => {

    // check if contract is approved
    // const remainingOptions = {
    //   address: CONSTANTS.sandboxyachts.token_address,
    //   abi: TSB_ABI,
    //   function_name: 'balanceOf',
    //   params: {
    //     owner: CONSTANTS.sportsYachtClaim.token_address,
    //     id: CONSTANTS.sandboxyachts.assets[type],
    //   },
    // }

    try {
      const response = await axios.post('https://m59jtciqre.execute-api.us-east-1.amazonaws.com/getRemainingSportsyacht', { id:  CONSTANTS.sandboxyachts.assets[type] });
      console.log(`${type} remaining:`, response.data);
      return response.data
    } catch (e) {
      setError(e.message);
    }
  

    // return Moralis.executeFunction(remainingOptions)
    // console.log('Fetching', type)
    // return Web3Api.native.runContractFunction(remainingOptions).catch(err => {console.log('Error fetching', type, ':', err)})
  }

  // React.useEffect(() => {
  //   if (user) {
  //     const ethAddress = user.get('ethAddress')
  //     console.log('user addr:', ethAddress)
  //     if (ethAddress != null) {
  //       fetchNFTsForContract()
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, [user])

  // React.useEffect(() => {
  //   if (!isAuthenticated) {
  //     setYachts(null)
  //   }
  //   // eslint-disable-next-line
  // }, [isAuthenticated])

  React.useEffect(() => {
    if (authenticated) {
      const ethAddress = session.address
      console.log('user addr:', ethAddress)
      if (ethAddress != null) {
        fetchNFTsForContract()
      }
    }
    // eslint-disable-next-line
  }, [authenticated, session])

  React.useEffect(() => {
    if (!authenticated) {
      setYachts(null)
    }
    // eslint-disable-next-line
  }, [authenticated])

  React.useEffect(() => {
    const sportsYachtSelected = redSelected || blackSelected || silverSelected
    const correctNumberOfOgYachts =
      selectedOgYachts.length === neededOgYachts.get(syColor)
    if (sportsYachtSelected && correctNumberOfOgYachts && acknowledged) {
      setClaimEnabled(true)
    } else {
      setClaimEnabled(false)
    }
  }, [
    acknowledged,
    redSelected,
    blackSelected,
    silverSelected,
    selectedOgYachts,
  ])

  React.useEffect(async () => {
    // if (!isWeb3Enabled) {
    //   console.log('Enabling web3')
    //   await Moralis.enableWeb3().then(res => console.log('Web3 enabled:', res)).catch(console.err)
    // }
    if (!isInitialized) {
      console.log('Initializing')
      await Moralis.initialize()
    }

    console.log('Even if not enabled')
    fetchRemaining('redSportsyacht')
      .then(parseInt)
      .then(setRedRemaining)
      .catch(console.error)
    fetchRemaining('silverSportsyacht')
      .then(parseInt)
      .then(setSilverRemaining)
      .catch(console.error)
    fetchRemaining('blackSportsyacht')
      .then(parseInt)
      .then(setBlackRemaining)
      .catch(console.error)
  }, [])

  const getImage = (y) => {
    const { metadata } = y
    const parsed = JSON.parse(metadata)
    return `https://apeharbour.mypinata.cloud/ipfs/${parsed.image.slice(7)}`
  }

  const getId = (y) => {
    return y.token_id
  }

  const unselectOgYacht = (id) => {
    console.log('Clicked delete with', id)
    const index = selectedOgYachts.indexOf(id)
    if (index === -1) {
      console.log('Element not found in selectedYachts')
      return
    }
    selectedOgYachts[index] = selectedOgYachts[selectedOgYachts.length - 1]
    selectedOgYachts.pop()
    selectedOgYachts.sort((a, b) => a - b)
    setSelectedOgYachts([...selectedOgYachts])
  }

  const selectOgYacht = (id) => {
    if (!selectedOgYachts.includes(id)) {
      selectedOgYachts.push(id)
      selectedOgYachts.sort((a, b) => a - b)
      setSelectedOgYachts([...selectedOgYachts])
    }
  }

  const handleOgYachtClick = (id) => {
    console.log('Clicked Yacht', id)
    if (selectedOgYachts.includes(id)) {
      unselectOgYacht(id)
    } else {
      selectOgYacht(id)
    }
  }

  const handleSportsYachtClick = (e) => {
    switch (e) {
      case 'red': {
        if (!redSelected && redRemaining > 0) {
          setRedSelected(true)
          setBlackSelected(false)
          setSilverSelected(false)
          setSyColor(e)
        }
        break
      }
      case 'black': {
        if (!blackSelected && blackRemaining > 0) {
          setRedSelected(false)
          setBlackSelected(true)
          setSilverSelected(false)
          setSyColor(e)
        }
        break
      }
      case 'silver': {
        if (!silverSelected && silverRemaining > 0) {
          setRedSelected(false)
          setBlackSelected(false)
          setSilverSelected(true)
          setSyColor(e)
        }
        break
      }
      default: {
        setRedSelected(true)
        setBlackSelected(false)
        setSilverSelected(false)
      }
    }
    console.log({ e })
  }

  const handleClaim = async (e) => {
    console.log(
      `Claiming ${syColor} sportsyacht for ${neededOgYachts.get(
        syColor,
      )} genesis yachts: ${selectedOgYachts}`,
    )

    await Moralis.enableWeb3()

    // check if contract is approved
    const isApprovedOptions = {
      contractAddress: abis.contracts.ApeHarbourYachts.address,
      abi: abis.contracts.ApeHarbourYachts.abi,
      functionName: 'isApprovedForAll',
      params: {
        owner: session.address,
        operator: CONSTANTS.sportsYachtClaim.token_address,
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
          operator: CONSTANTS.sportsYachtClaim.token_address,
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
    console.log(
      CONSTANTS.sportsYachtClaim.token_address,
      'is approved for',
      session.address,
      ':',
      approvedAfter,
    )

    if (approvedAfter) {
      setBackdropActive(true)

      console.log(
        selectedOgYachts.map((x) => parseInt(x)),
        sportsYachtIds.get(syColor),
      )

      const claimOptions = {
        contractAddress: CONSTANTS.sportsYachtClaim.token_address,
        abi: ahSportsyachtClaimAbi.abi,
        functionName: 'claim',
        params: {
          _sportsYachtId: sportsYachtIds.get(syColor),
          _ogYachts: selectedOgYachts,
        },
      }

      Moralis.executeFunction(claimOptions)
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

          setBackdropActive(false)

          const decreasedYachts = yachts.result.filter(
            (y) => !selectedOgYachts.includes(y.token_id),
          )

          console.log(
            `Old length ${yachts.result.length}, new length ${decreasedYachts.length}`,
          )

          const newYachts = { ...yachts }

          newYachts.total = decreasedYachts.length
          newYachts.result = decreasedYachts

          setYachts(newYachts)
          setSelectedOgYachts([])

          // check ownerships
          const ownersPromisses = selectedOgYachts.map((x) => {
            const ownerOfOptions = {
              contractAddress: abis.contracts.ApeHarbourYachts.address,
              abi: abis.contracts.ApeHarbourYachts.abi,
              functionName: 'ownerOf',
              params: {
                tokenId: parseInt(x),
              },
            }

            console.log(ownerOfOptions)
            return Moralis.executeFunction(ownerOfOptions)
          })

          return Promise.all(ownersPromisses)
        })
        .then((response) => {
          console.log(response)

          switch (syColor) {
            case 'red': {
              fetchRemaining('redSportsyacht')
                .then(parseInt)
                .then(setRedRemaining)
                .catch(console.error)
              break
            }
            case 'black': {
              fetchRemaining('blackSportsyacht')
                .then(parseInt)
                .then(setBlackRemaining)
                .catch(console.error)
              break
            }
            case 'silver': {
              fetchRemaining('silverSportsyacht')
                .then(parseInt)
                .then(setSilverRemaining)
                .catch(console.error)
              break
            }
          }
        })
        .catch((error) => {
          console.log(error)
          setBackdropActive(false)
          setErrorMessage('Claim failed, see console for details')
          setSnackbarVisible(true)
        })
    }
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">➊ Select Sportsyacht</Typography>
              </Grid>

              <Grid item sx={{ position: 'relative' }}>
                <YachtSelectOption
                  color="silver"
                  remaining={silverRemaining}
                  selected={silverSelected}
                  handleClick={handleSportsYachtClick}
                  imgSrc={sportsyacht_silver}
                />
              </Grid>

              <Grid item sx={{ position: 'relative' }}>
                <YachtSelectOption
                  color="black"
                  remaining={blackRemaining}
                  selected={blackSelected}
                  handleClick={handleSportsYachtClick}
                  imgSrc={sportsyacht_black}
                />
              </Grid>

              <Grid item sx={{ position: 'relative' }}>
                <YachtSelectOption
                  color="red"
                  remaining={redRemaining}
                  selected={redSelected}
                  handleClick={handleSportsYachtClick}
                  imgSrc={sportsyacht_red}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">
                  ➋ Select Genesis Yachts to Burn
                </Typography>
                <Typography gutterBottom mt={2}>
                  To claim a {syColor} Sportsyacht you will have to burn{' '}
                  {neededOgYachts.get(syColor)} Genesis Yacht
                  {neededOgYachts.get(syColor) > 1 ? 's' : ''}. Select{' '}
                  {syColor === 'red' ? 'it' : 'them'} below.
                </Typography>

                {!authenticated && (
                  <Alert
                    severity="warning"
                    // icon={false}
                  >
                    <AlertTitle>
                      <Typography variant="h5">Not connected!</Typography>
                    </AlertTitle>
                    <Typography variant="body1">
                      Please connect your wallet to manage your yachts.
                    </Typography>
                  </Alert>
                )}

                {authenticated && yachts && yachts.result.length > NUMBER_OF_ITEMS_PER_PAGE && (
                  <Pagination
                    count={
                      Math.floor(yachts.result.length / NUMBER_OF_ITEMS_PER_PAGE) + 1
                    }
                    color="primary"
                    page={page}
                    onChange={handlePageChange}
                  />
                )}
              </Grid>

              {authenticated && yachts && yachts.result &&
                yachts.result.length > 0 &&
                yachts.result
                  .sort((a, b) => a.token_id - b.token_id)
                  .slice(
                    (page - 1) * NUMBER_OF_ITEMS_PER_PAGE,
                    page * NUMBER_OF_ITEMS_PER_PAGE,
                  )
                  .map((y) => (
                    <Grid
                      item
                      key={[y.token_address, y.token_id].join('-')}
                      sx={{
                        position: 'relative',
                        '&:hover': {
                          cursor: 'pointer',
                        },
                      }}
                      onClick={() => handleOgYachtClick(getId(y))}
                    >
                      <Box
                        component="img"
                        sx={{
                          height: '100px',
                          filter: 'grayscale(80%) brightness(0.8)',
                          '&:hover': {
                            cursor: 'pointer',
                            filter: 'grayscale(0%) brightness(1)',
                          },
                        }}
                        src={getImage(y)}
                      />
                      <Chip
                        label={`#${getId(y)}`}
                        sx={{ position: 'absolute', right: 24, top: 24 }}
                        color="primary"
                      />
                      <Fire
                        width="80px"
                        left="66px"
                        top="20px"
                        selected={selectedOgYachts.includes(getId(y))}
                      />
                    </Grid>
                  ))}
              <Grid item xs={12}>
                <Typography variant="h6">Selected Genesis Yachts</Typography>
                <Stack direction="row" spacing={1}>
                  {selectedOgYachts.map((ogyacht) => (
                    <Chip
                      label={ogyacht}
                      onDelete={() => unselectOgYacht(ogyacht)}
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ padding: 2 }}>
            <Stack spacing={2}>
              <Typography variant="h5">➌ Claim</Typography>

              <Typography gutterBottom>
                Claiming a Sportsyacht is a 2-step process. First you approve
                the smart contract to burn Genesis Yachts. Then you claim the
                Sportsyacht. Both transactions must be confirmed; only the
                second transaction will claim and burn.
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    // disabled={namedAlready}
                    value={acknowledged}
                    onChange={handleAcknowledgeChange}
                    color="secondary"
                  />
                }
                label={`I acknowledge that I will burn ${neededOgYachts.get(
                  syColor,
                )} Genesis Yacht${neededOgYachts.get(syColor) > 1 ? 's' : ''}.`}
              />
              <Typography variant="h6">Checks</Typography>
              <Stack spacing={1}>
                <Check
                  checked={redSelected || blackSelected || silverSelected}
                  msg="Sportsyacht"
                />
                <Check
                  checked={
                    neededOgYachts.get(syColor) === selectedOgYachts.length
                  }
                  msg={`Genesis Yachts (${neededOgYachts.get(
                    syColor,
                  )} needed, ${selectedOgYachts.length} selected)`}
                />
                <Check checked={acknowledged} msg="Acknowledged Burn" />
                <Check
                  checked={startTimePassed()}
                  msg="Start time has passed"
                />
              </Stack>
              <Button
                size="large"
                variant="contained"
                disabled={!claimEnabled || !startTimePassed()}
                onClick={handleClaim}
                startIcon={
                  <Box
                    component="img"
                    src={speedboat}
                    sx={{ width: '32px' }}
                    alt="Speedboat"
                  />
                }
              >
                Claim Sportsyacht
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropActive}
        onClick={() => setBackdropActive(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  )
}
