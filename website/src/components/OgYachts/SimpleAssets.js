import * as React from 'react'
import { useState } from 'react'
import {
  Alert,
  Backdrop,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
  Typography,
} from '@mui/material'

import {
  NotAuthenticatedError,
  useMoralis,
  useMoralisCloudFunction,
  useMoralisWeb3Api,
} from 'react-moralis'
import SimpleAssetCard from '../yachtCard/SimpleAssetCard'
import StatsCard from './StatsCard'
import PleaseConnectMsg from './PleaseConnectMsg'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

export default function SimpleAssets(props) {
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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
  )

  const ethers = Moralis.web3Library
  const NUMBER_OF_ITEMS_PER_PAGE = 18

  const [yachts, setYachts] = useState(null)
  const [loadingYachts, setLoadingYachts] = useState(false)
  const [numberOfYachts, setNumberOfYachts] = useState(0)
  const [page, setPage] = useState(1)
  const [stats, setStats] = useState(null)
  const [statsLoaded, setStatsLoaded] = useState(false)
  const [transfers, setTransfers] = useState(null)
  const [ownerData, setOwnerData] = useState(null)
  const [yachtData, setYachtData] = useState(null)

  const { data, error, isLoading } = useMoralisCloudFunction(
    'getHoldersByDay',
    { transfers: props.transfers },
  )

  const Web3Api = useMoralisWeb3Api()

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const fetchNFTsForContract = async () => {
    console.log('Fetching yachts for', user.get('ethAddress'))
    setLoadingYachts(true)
    const options = {
      chain: props.chain,
      address: user.get('ethAddress'),
      token_address: props.token_address,
    }
    console.log({options})

    // Web3Api.token.getNFTOwners({ address: props.token_address})
    Web3Api.account.getNFTsForContract(options)
      .then(async (nfts) => {

        console.log({nfts})
        
        let allNFTs = nfts || [];
        console.log({allNFTs})
        console.log('Length of allNFTs', allNFTs.result.length)
        
        while (nfts.next) {
          nfts = await nfts.next()
          allNFTs.result.push(...nfts.result)
          console.log('Length of allNFTs', allNFTs.result.length)
        }
        console.log('Final Length of allNFTs', allNFTs.result.length)
        allNFTs.result = allNFTs.result.map(({ metadata, ...token }) => ({
          ...token,
          metadata: "{\"id\":\"urn:decentraland:matic:collections-v2:0xcf97c3b8db98733c69b9d6560a27a734c49177fb:0\",\"name\":\"Ape Harbour Hoodie\",\"description\":\"DCL Wearable 3/5000\",\"language\":\"en-US\",\"image\":\"https://peer-eu1.decentraland.org/content/contents/Qmatca5VqpXyHT4r3iUYgi3FSm4zzrkpq1q5tAkhhJ5WZB\",\"thumbnail\":\"https://peer-eu1.decentraland.org/content/contents/QmSHFDtstS5AUfBUrMRgjtUGgC9K9XFUv3z1Pmi7MTUoMS\",\"attributes\":[{\"trait_type\":\"Rarity\",\"value\":\"rare\"},{\"trait_type\":\"Category\",\"value\":\"upper_body\"},{\"trait_type\":\"Body Shape\",\"value\":\"BaseMale\"},{\"trait_type\":\"Body Shape\",\"value\":\"BaseFemale\"}]}"
        }));
        setYachts(allNFTs)
        setLoadingYachts(false)
      })
      .catch((e) => {
        setLoadingYachts(false)
        console.log(e)
      })

    const nullAddressOptions = {
      token_address: props.token_address,
      address: '0x000000000000000000000000000000000000dEaD',
      chain: props.chain,
    }
    Web3Api.account
      .getNFTsForContract(nullAddressOptions)
      .then((nfts) => {
        setNumberOfYachts(7777 - nfts.total)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  React.useEffect(() => {
    if (user) {
      const ethAddress = user.get('ethAddress')
      console.log('user addr:', ethAddress)
      if (ethAddress != null) {
        fetchNFTsForContract()
      }
    }
    // eslint-disable-next-line
  }, [user])

  React.useEffect(() => {
    if (!isAuthenticated) {
      setYachts(null)
    }
    // eslint-disable-next-line
  }, [isAuthenticated])

  // retrieve collection stats
  React.useEffect(() => {
    if (isInitialized) {
      console.log('fetching stats')
      setStatsLoaded(false)
      const osUrl = `https://api.opensea.io/api/v1/collection/${props.osSlug}/stats`
      fetch(osUrl, {
        headers: {
          Accept: 'application/json',
          'X-API-KEY': '1c7494d57c8840b4ad1e3af28be347fb',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          const { stats } = result
          setStats(stats)
          setStatsLoaded(true)
        })
        .catch(console.error)
    }
  }, [isInitialized])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">{props.title}</Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <StatsCard
          caption="Floor Price on Opensea"
          value={stats == null ? '??' : `${stats.floor_price} ETH`}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Card sx={{ position: 'relative' }}>
          <CardContent>
            <Typography variant="overline" textAlign="end" component="div">
              Total {props.token_name}
            </Typography>
            <Typography variant="h3" textAlign="end"> { numberOfYachts }
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {isAuthenticated && yachts && (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <StatsCard caption={`Your ${props.token_name}`} value={yachts.result.length} />
        </Grid>
      )}

      {!isAuthenticated && (<PleaseConnectMsg /> )}

        <Grid item xs={12}>
      {yachts && yachts.result.length > NUMBER_OF_ITEMS_PER_PAGE && (
          <Pagination
            count={Math.floor(yachts.result.length / NUMBER_OF_ITEMS_PER_PAGE) + 1}
            color="primary"
            page={page}
            onChange={handlePageChange}
          />
      )}
        </Grid>

      {yachts && yachts.result.length > 0 && (
        <React.Fragment>
          {yachts.result
            .sort((a, b) => a.token_id - b.token_id)
            .slice(
              (page - 1) * NUMBER_OF_ITEMS_PER_PAGE,
              page * NUMBER_OF_ITEMS_PER_PAGE,
            )
            .map((y) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={2}
                key={[y.token_address, y.token_id].join('-')}
              >
                <SimpleAssetCard yacht={y} />
              </Grid>
            ))}
        </React.Fragment>
      )}

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
