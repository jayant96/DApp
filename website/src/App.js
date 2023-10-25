import * as React from 'react'
import Container from '@mui/material/Container'
import AHAppBar from './components/AHAppBar'
import Footer from './components/Footer'
import HarbourManagement from './components/HarbourManagement/HarbourManagement'
import '@fontsource/raleway/variable.css'
import '@fontsource/recursive'
import '@fontsource/oswald'
import '@fontsource/roboto-slab'
import '@fontsource/open-sans'
import About from './components/About/About'
import Collections from './components/Collections'
import { Routes, Route } from 'react-router-dom'
import Imprint from './components/Imprint'
import OgYachts from './components/OgYachts/OgYachts'
import SuperYachts from './components/OgYachts/SuperYachts'
import Surfboard from './components/OgYachts/Surfboard'
import DclHoodie from './components/OgYachts/DclHoodie'
import Hoodie from './components/OgYachts/Hoodie'
import SandboxAssets from './components/OgYachts/SandboxAssets'
import SandboxYachts from './components/OgYachts/SandboxYachts'
import SimpleAssets from './components/OgYachts/SimpleAssets'
import YachtDetail from './components/YachtDetail'
import SuperyachtDetail from './components/SuperyachtDetail'
import SandboxyachtDetail from './components/SandboxyachtDetail'
import HoodieDetail from './components/HoodieDetail'
import SandboxAssetDetail from './components/SandboxAssetDetail'
import Tokens from './components/Tokens'
import { Stack } from '@mui/material'
import SurfboardDetail from './components/SurfboardDetail'
import DclHoodieDetail from './components/DclHoodieDetail'
import { CONSTANTS } from './constants.mjs'
import ClaimSportsyacht from './components/ClaimSportsyacht'
import TermsAndConditions from './components/TermsAndConditions'
import {Box, Grid, useTheme, useMediaQuery} from '@mui/material'
// import { Maintenance } from "./components/Maintenance"; // Maintance page

import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { mainnet } from "wagmi/chains";

const { provider, webSocketProvider } = configureChains([mainnet], [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

export default function App() {
  const appBarHeight = -124;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <React.Fragment>
      <WagmiConfig client={client}>
      <Box sx={{ overflowX: 'hidden'}}> 
      <AHAppBar/>
  
     
      <Grid container direction="column" style={{ minHeight: '100vh' }}>
        <Grid item xs>
         <Container maxWidth={false} sx={isMobile ? { mt: `${appBarHeight}px` } : {}}> {/* Adding a top margin to the Container equal to AppBar height */}
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="harbourmanagement" element={<HarbourManagement />} />
            <Route path="collections" element={<Collections />} />
            {/* <Route path="ogyachts" element={<Maintenance />}/> */}
            <Route path="ogyachts" element={<Tokens />}>
              <Route
                index
                element={
                  <OgYachts
                    title={CONSTANTS.ogyachts.title}
                    chain={CONSTANTS.ogyachts.chain}
                    token_address={CONSTANTS.ogyachts.token_address}
                    transfers={CONSTANTS.ogyachts.transfers}
                    osSlug={CONSTANTS.ogyachts.os_slug}
                    token_name={CONSTANTS.ogyachts.short_title}
                  />
                }
              />
              <Route
                path=":tokenId"
                element={
                  <YachtDetail  />
                    // chain={CONSTANTS.ogyachts.chain}
                    // token_address={CONSTANTS.ogyachts.token_address}
                 
                }
              />
            </Route>
            {/* <Route path="superyachts" element={<Maintenance />} /> */}
             <Route path="superyachts" element={<Tokens />}>
              <Route
                index
                element={
                  <SuperYachts
                    title={CONSTANTS.superyachts.title}
                    chain={CONSTANTS.superyachts.chain}
                    token_address={CONSTANTS.superyachts.token_address}
                    transfers={CONSTANTS.superyachts.transfers}
                    osSlug={CONSTANTS.superyachts.os_slug}
                    token_name={CONSTANTS.superyachts.short_title}
                  />
                }
              />
              <Route
                path=":tokenId"
                element={
                  <SuperyachtDetail
                  //   chain={CONSTANTS.superyachts.chain}
                  //   token_address={CONSTANTS.superyachts.token_address}
                    ogYachtsContract={CONSTANTS.ogyachts.token_address}
                  />
                }
              />
            </Route>

            {/* <Route path="sandboxyachts" element={<Maintenance />} /> */}
           <Route path="sandboxyachts" element={<Tokens />}>
                <Route 
                 index
                 element={
                  <SandboxYachts
                  title={CONSTANTS.sandboxyachts.title}
                    chain={CONSTANTS.sandboxyachts.chain}
                    token_address={CONSTANTS.sandboxyachts.token_address}
                    osSlug={CONSTANTS.sandboxyachts.os_slug}
                    token_name={CONSTANTS.sandboxyachts.short_title}
                    item_id={CONSTANTS.sandboxyachts.items}
                />
                 }
                 ></Route>
                  <Route
                path=":tokenId"
                element={
                  <SandboxyachtDetail
                  // chain={CONSTANTS.sandboxyachts.chain}
                  // token_address={CONSTANTS.sandboxyachts.token_address}
                  />
                }
              /> 
              <Route
                path="claim"
                element={
                  <ClaimSportsyacht
                    chain={CONSTANTS.sandboxyachts.chain}
                    ogYachtsContract={CONSTANTS.ogyachts.token_address}
                  />
                }
              />
              </Route>

             
            {/* <Route path="surfboards" element={<Maintenance />} /> */}
             <Route path="surfboards" element={<Tokens />}>
              <Route
                index
                element={
                  <Surfboard
                    title={CONSTANTS.surfboards.title}
                    chain={CONSTANTS.surfboards.chain}
                    token_address={CONSTANTS.surfboards.token_address}
                    transfers={CONSTANTS.surfboards.transfers}
                    osSlug={CONSTANTS.surfboards.os_slug}
                    token_name={CONSTANTS.surfboards.short_title}
                  />
                }
              />
              <Route
                path=":tokenId"
                element={
                  <SurfboardDetail
                    // chain={CONSTANTS.surfboards.chain}
                    // token_address={CONSTANTS.surfboards.token_address}
                  />
                }
              />
            </Route>

            {/* <Route path="hoodies" element={<Maintenance />} /> */}
             <Route path="hoodies" element={<Tokens />}>
              <Route
                index
                element={
                  <Hoodie
                    title={CONSTANTS.hoodies.title}
                    chain={CONSTANTS.hoodies.chain}
                    token_address={CONSTANTS.hoodies.token_address}
                    transfers={CONSTANTS.hoodies.transfers}
                    osSlug={CONSTANTS.hoodies.os_slug}
                    token_name={CONSTANTS.hoodies.short_title}
                  />
                }
              />
              <Route
                path=":tokenId"
                element={
                  <HoodieDetail
                    // chain={CONSTANTS.hoodies.chain}
                    // token_address={CONSTANTS.hoodies.token_address}
                  />
                }
              />
            </Route>

            {/* <Route path="dclhoodies" element={<Maintenance />} /> */}
             <Route path="dclhoodies" element={<Tokens />}>
              <Route
                index
                element={
                  <DclHoodie
                    title={CONSTANTS.dclHoodies.title}
                    chain={CONSTANTS.dclHoodies.chain}
                    token_address={CONSTANTS.dclHoodies.token_address}
                    osSlug={CONSTANTS.dclHoodies.os_slug}
                    token_name={CONSTANTS.dclHoodies.short_title}
                  />
                }
              />
              <Route
                path=":tokenId"
                element={
                  <DclHoodieDetail
                    // chain={CONSTANTS.dclHoodies.chain}
                    // token_address={CONSTANTS.dclHoodies.token_address}
                  />
                }
              />
            </Route>

            {/* <Route path="sandboxassets" element={<Maintenance />} /> */}
             <Route path="sandboxassets" element={<Tokens />}>
              <Route
                index
                element={
                  <SandboxAssets
                    title={CONSTANTS.tsbAssets.title}
                    chain={CONSTANTS.tsbAssets.chain}
                    token_address={CONSTANTS.tsbAssets.token_address}
                    osSlug={CONSTANTS.tsbAssets.os_slug}
                    token_name={CONSTANTS.tsbAssets.short_title}
                    item_id={CONSTANTS.tsbAssets.items}
                  />
                }
              />
              <Route
                path=":tokenId"
                element={
                  <SandboxAssetDetail
                    // chain={CONSTANTS.tsbAssets.chain}
                    // token_address={CONSTANTS.tsbAssets.token_address}
                  />
                }
              />
            </Route>
            
            <Route path="imprint" element={<Imprint />} />
            <Route path="terms" element={<TermsAndConditions />} />
          </Routes>
        </Container>
        </Grid>
        <Grid item>
     <Footer />
     </Grid>
     </Grid>
    </Box>
   </WagmiConfig>
</React.Fragment>
  )
}
