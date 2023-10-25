import * as React from 'react'
import {
  Box,
  FormControlLabel,
  Grid,
  Link,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { useParams, useLocation } from 'react-router-dom'
import FullscreenBackdrop from './FullscreenBackdrop'
import PleaseConnectMsg from './OgYachts/PleaseConnectMsg'
import { useAuth } from './AuthContext'


export default function HoodieDetail(props) {
  const { session, authenticated } = useAuth()
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
  const httpUrl = ipfsUrl ? ipfsUrl.replace("ipfs://", "https://ipfs.io/ipfs/") : null;
  const params = useParams()
  const [backdropActive, setBackdropActive] = React.useState(false)
  const [apeError, setApeError] = React.useState(false)
  const [apeErrorMsg, setApeErrorMsg] = React.useState('')
  const [colorMarks, setColorMarks] = React.useState([
    { value: 0, label: 'black' },
    { value: 1, label: 'haw' },
  ])

  const logoMarks = [
    { value: 0, label: 'Ape Harbour' },
    { value: 1, label: 'Pirate' },
    { value: 2, label: 'Bananas' },
  ]

  const extrasMarks = [
    { value: 0, label: 'None' },
    { value: 1, label: 'Trident' },
    { value: 2, label: 'Eyes' },
  ]

  const [color, setColor] = React.useState(0)
  const [logo, setLogo] = React.useState(0)
  const [extra, setExtra] = React.useState(false)
  const [collarV2, setCollarV2] = React.useState(false)
  const [hoodiefileName, setHoodieFileName] = React.useState(
    'https://apeharbour.mypinata.cloud/ipfs/QmX1HgjmVvBF9USuCsqUJRRE6sbqgz56GFdctphTxDsu4g/T3/BLK-V1-L1Artboard%201.png',
  )
  const [dressApe, setDressApe] = React.useState(false)
  const [ape, setApe] = React.useState(0)
  const [apeFilename, setApeFilename] = React.useState(
    'https://apeharbour.mypinata.cloud/ipfs/QmQ6VgRFiVTdKbiebxGvhW3Wa3Lkhpe6SkWBPjGnPkTttS/0.png',
  )

  const handleColorChange = (event) => {
    setColor(Number(event.target.value))
  }

  const handleLogoChange = (event) => {
    setLogo(Number(event.target.value))
  }

  const handleExtraChange = (event) => {
    setExtra(Number(event.target.value))
  }

  const handleCollarChange = (event) => {
    setCollarV2(event.target.checked)
  }

  const handleApeChange = (event) => {

    if (event.target.valueAsNumber < 0 || event.target.valueAsNumber > 9999) {
      setApeError(true)
      setApeErrorMsg('Ape# must be between 0 and 9999')
      return
    }

    setApeError(false)
    setApeErrorMsg('')

    setApe(Number(event.target.value))
  }

  const handleDressApeChange = (event) => {
    setDressApe(event.target.checked)
  }

  React.useEffect(() => {
    if (httpUrl != null) {
      const colorCodes = ['BLK', 'HAW', 'SQUIG', 'GOLD']
      const logoCodes = ['-L1', '-L2', '-L3']
      const collarCodes = ['-V1', '-V2']
      const extrasCodes = ['', '-TRI', '-EYES']
      const folder = httpUrl && httpUrl.replace('preview.png', '')
      const hoodie = [
        colorCodes[color],
        collarCodes[collarV2 ? 1 : 0],
        logoCodes[logo],
        extrasCodes[extra],
        'Artboard%201.png',
      ].join('')
      const hoodiePath = [folder, hoodie].join('')

      const apeBaseImgUri =
        'https://apeharbour.mypinata.cloud/ipfs/QmQ6VgRFiVTdKbiebxGvhW3Wa3Lkhpe6SkWBPjGnPkTttS/{id}.png'
      const apeUrl = apeBaseImgUri.replace('{id}', ape)
      setApeFilename(apeUrl)

      setBackdropActive(true)

      if (!dressApe) {
        setHoodieFileName(hoodiePath)
        setBackdropActive(false)
      } else {
        const renderUrl =
          'https://xr21gnk28f.execute-api.us-east-1.amazonaws.com/dev/apes'

        const data = {
          apeId: apeUrl,
          hoodie: hoodie.replace('%20', ' '),
        }

        console.log({ data })
        fetch(renderUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
          .then((response) => response.blob())
          .then((blob) => URL.createObjectURL(blob))
          .then((url) => setHoodieFileName(url))
          .catch(console.error)
          .finally(() => setBackdropActive(false))
      }
    }
  }, [color, logo, extra, collarV2, ape, dressApe])


  const fetchTokenIdMetadata = (token) => {
    if (authenticated) {
  
    console.log('token id', tokenId)

    switch (Number(tokenId)) {
      case 3:
        setColorMarks([
          { value: 0, label: 'black' },
          { value: 1, label: 'haw' },
          { value: 2, label: 'squig' },
          { value: 3, label: 'gold' },
        ])
        break
      case 2:
        setColorMarks([
          { value: 0, label: 'black' },
          { value: 1, label: 'haw' },
          { value: 2, label: 'squig' },
        ])
        break
      default:
        setColorMarks([
          { value: 0, label: 'black' },
          { value: 1, label: 'haw' },
        ])
        break
    }
  }
}

  const valueLabelFormat = (value) => {
    return colorMarks.findIndex((mark) => mark.value === value) + 1
  }

  function valuetext(value) {
    const marksIndex = colorMarks.findIndex((mark) => mark.value === value)
    return colorMarks[marksIndex].label
  }

   React.useEffect(() => {
    if (authenticated) {
       fetchTokenIdMetadata(tokenId)
     }
   }, [authenticated])

  return (
    <Grid>
    {authenticated ? (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} marginTop={isMobile ? 15 : 2}>
          <Typography variant="h4">{name}</Typography>
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

        <Grid item xs={12} md={8} lg={4}>
          <Box
            component="img"
            src={hoodiefileName}
            alt={name}
            loading="lazy"
            sx={{
              width: '100%',
              backgroundColor: '#ccc',
            }}
          />
        </Grid>

        <Grid item xs={12} md={4} lg={6}>
          <Stack spacing={2}>
            <Typography variant="h6">Color</Typography>
            <Box paddingLeft={6} sx={{ width: 300 }}>
              <Slider
                aria-label="Color"
                marks={colorMarks}
                step={null}
                value={color}
                onChange={handleColorChange}
                color="secondary"
                getAriaValueText={valuetext}
                valueLabelFormat={valueLabelFormat}
                max={colorMarks.length - 1}
              />
            </Box>

            <Typography variant="h6">Logo</Typography>
            <Box paddingLeft={6} sx={{ width: 300 }}>
              <Slider
                aria-label="Logo"
                marks={logoMarks}
                step={null}
                value={logo}
                onChange={handleLogoChange}
                color="secondary"
                max={logoMarks.length - 1}
              />
            </Box>

            <Typography variant="h6">Extras</Typography>
            <Box paddingLeft={6} sx={{ width: 300 }}>
              <Slider
                aria-label="Extras"
                marks={extrasMarks}
                step={null}
                value={extra}
                onChange={handleExtraChange}
                color="secondary"
                max={extrasMarks.length - 1}
              />
            </Box>

            <FormControlLabel
              control={
                <Switch
                  color="secondary"
                  checked={collarV2}
                  onChange={handleCollarChange}
                />
              }
              label="Alternative Collar"
            />

            <Typography variant="h5">Dress Ape</Typography>
            <FormControlLabel
              control={
                <Switch
                  color="secondary"
                  checked={dressApe}
                  onChange={handleDressApeChange}
                />
              }
              label="Dress Ape"
            />
            <Stack direction="row" spacing={2}>
              <Box paddingLeft={6} sx={{ width: 300 }}>
                <Stack spacing={2}>
                  <Slider
                    aria-label="Extras"
                    step={1}
                    valueLabelDisplay="auto"
                    value={ape}
                    onChange={handleApeChange}
                    color="secondary"
                    min={0}
                    max={9999}
                  />
                  <TextField
                    value={ape}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={apeError}
                helperText={apeErrorMsg}
                    label="BAYC ID"
                    onChange={handleApeChange}
                    color='secondary'
                  />
                </Stack>
              </Box>

              <Box
                component="img"
                src={apeFilename}
                alt="BAYC"
                loading="lazy"
                sx={{
                  width: '100px',
                }}
              />
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <FullscreenBackdrop open={backdropActive} />
    </React.Fragment>) : (<PleaseConnectMsg height='120px' />)} </Grid>
  )
}
