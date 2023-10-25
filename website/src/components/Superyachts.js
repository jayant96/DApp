import * as React from 'react'
import { useState } from 'react'
import { Alert, Grid, Stack, Typography } from '@mui/material'

import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import YachtCard from './yachtCard/YachtCard'

export default function Superyachts(props) {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis()

  const [yachts, setYachts] = useState(null)
  const [loadingYachts, setLoadingYachts] = useState(false)

  const Web3Api = useMoralisWeb3Api()

  const fetchNFTsForContract = async () => {
    setLoadingYachts(true)
    const options = {
      chain: 'eth',
      address: user.get('ethAddress'),
      token_address: '0xe8076b98Cd6E4E1018A7208c05e8a8443B0Dd35B',
    }
    Web3Api.account
      .getNFTsForContract(options)
      .then((result) => {
        setYachts(result)
        setLoadingYachts(false)
      })
      .catch((e) => {
        setLoadingYachts(false)
        console.log(e)
      })
  }

  if (!isAuthenticated || !account) {
    return (
      <Stack spacing={2}>
        <Typography variant="h4">Superyachts</Typography>
        <Alert severity="warning">
          Please connect your account to see you yachts.
        </Alert>
      </Stack>
    )
  }

  console.log('loading:', loadingYachts, 'yachts == null:', yachts == null)
  console.log('Yachts:', yachts)

  if (!loadingYachts && yachts == null) {
    fetchNFTsForContract()
    console.log({ yachts })
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Superyachts</Typography>
      {yachts != null && (
        <Alert severity="info">You own {yachts.result.length} yachts.</Alert>
      )}
      {yachts != null && yachts.result.length > 0 && (
        <Grid container spacing={2}>
          {yachts.result.slice(0, 130).map((y) => (
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <YachtCard yacht={y} />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  )
}
