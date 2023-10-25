import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Stack,
  SvgIcon,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Address from './Address'
import MetamaskLogo from '../shared_assets/Metamask-icon.png'
//import WalletconnectLogo from '../shared_assets/walletconnect-logo.png'
import { useAuth } from './AuthContext';
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import axios from 'axios';

export default function Account() {

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { session, setSession, authenticated, setAuthenticated } = useAuth();
  const [accountDialogOpen, setAccountDialogOpen] = useState(false);
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    if (authenticated) {
      axios
        .get(`https://m59jtciqre.execute-api.us-east-1.amazonaws.com/authenticate`, {
          withCredentials: true,
        })
        .then(({ data }) => {
          console.log(data);
          const { iat, ...authData } = data; // remove unimportant iat value
          setSession(authData);
          localStorage.setItem("userSession", JSON.stringify(authData));
        })
        .catch((err) => {
          setSession({});
        });
    }
  }, [authenticated]);

  function clearCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  async function signOut() {
    await axios.get(`https://m59jtciqre.execute-api.us-east-1.amazonaws.com/logout`, {
     withCredentials: true,
   });

   clearCookie('jwt');
   setAuthenticated(false);
   setSession({});
   localStorage.removeItem("userSession");
   // Refresh the current URL
  window.location.reload();
   setAccountDialogOpen(false); 
  }

  const handleAuth = async () => {

    if(isMobile){
     
    if (window.ethereum && window.ethereum.isMetaMask) {
      
      if (isConnected) {
        await disconnectAsync();
      }
      
      const { account, chain } = await connectAsync({
        connector: new InjectedConnector(),
      });

      console.log('Account:', account, ' Chain:', chain);
      setConnectDialogOpen(false);

      const userData = { address: account, chain: chain.id };
      
      const { data } = await axios.post(
        `https://m59jtciqre.execute-api.us-east-1.amazonaws.com/request-message`,
        userData,
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      const message = data.message;
      
      const signature = await signMessageAsync({ message });

      const response = await axios.post(
        `https://m59jtciqre.execute-api.us-east-1.amazonaws.com/verify`,
        {
          message,
          signature,
        },
        { withCredentials: true } // set cookie from Express server
      );

      if (response.status === 200) {
        setAuthenticated(true);
      } else {
        console.error('Verification failed:', response);
      }
    } else {
      // If the site is not being accessed from the Metamask browser, open it in the Metamask browser
      const currentUrl = window.location.href;
      const deepLink = `https://metamask.app.link/dapp/${currentUrl}`;
      window.location.href = deepLink;
    }

    } else {
    //disconnects the web3 provider if it's already active
    if (isConnected) {
      await disconnectAsync();
    }
    // enabling the web3 provider metamask
    const { account, chain } = await connectAsync({
      connector: new InjectedConnector(),
    });

    console.log('Account:', account, ' Chain:', chain);
    setConnectDialogOpen(false);

    const userData = { address: account, chain: chain.id };
    // making a post request to our 'request-message' endpoint
    const { data } = await axios.post(
      `https://m59jtciqre.execute-api.us-east-1.amazonaws.com/request-message`,
      userData,
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    const message = data.message;
    // signing the received message via metamask
    const signature = await signMessageAsync({ message });

    const response = await axios.post(
      `https://m59jtciqre.execute-api.us-east-1.amazonaws.com/verify`,
      {
        message,
        signature,
      },
      { withCredentials: true } // set cookie from Express server
    );

    if (response.status === 200) {
      setAuthenticated(true);
    } else {
      console.error('Verification failed:', response);
    }
  }
}

  useEffect(() =>{
    if(session.address){
      console.log('Address: ', session.address);
      console.log('Authenticated: ', authenticated );
      console.log('ConnectDialog: ', connectDialogOpen);
      console.log('AccountDialog: ', accountDialogOpen);
    }
  }, [session.address, authenticated, connectDialogOpen, accountDialogOpen]);
  


  if (!authenticated) {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setConnectDialogOpen(true)}
        >
          Connect
        </Button>
        <Dialog
          open={connectDialogOpen}
          onClose={() => setConnectDialogOpen(false)}
        >
          <DialogTitle>
            Login
            <IconButton
              aria-label="close"
              onClick={() => setConnectDialogOpen(false)}
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
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleAuth}
                startIcon={
                  <Box
                    component="img"
                    src={MetamaskLogo}
                    sx={{ width: '24px' }}
                    alt="Metamask"
                  />
                }
              >
                Metamask
              </Button>
              {/* <Button
                color="secondary"
                variant="outlined"
                onClick={loginWalletConnect}
                startIcon={
                  <Box
                    component="img"
                    src={WalletconnectLogo}
                    sx={{ width: '24px' }}
                    alt="Walletconnect"
                  />
                }
              >
                WalletConnect
              </Button> */}
            </Stack>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <>
      {/* <Address
        // ensName={ensName}
        address={session.address}
        onClick={() => setAccountDialogOpen(true)}
        copyable={false}
        shortForm={true}
        // identicon={avatarLink}
        size={32}
      /> */}
       <IconButton>
      {/* <FontAwesomeIcon icon={faXmark} /> */}
      <span onClick={() => setAccountDialogOpen(true)}
    style={{
      textDecoration: 'underline',
      cursor: 'pointer',
      fontWeight: '900',
      fontSize: '15px',
      color: '#3D3D3D',
    }}>
        {session.address
      ? `${session.address.slice(0, 5)}...${session.address.slice(-3)}`
      : "Loading..."}
      </span>
    </IconButton>
   

      <Dialog
        open={accountDialogOpen}
        onClose={() => setAccountDialogOpen(false)}
      >
        <DialogTitle>
          Account
          <IconButton
            aria-label="close"
            onClick={() => setAccountDialogOpen(false)}
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
          <Stack spacing={2} alignItems="flex-start">
            {/* <Address
              // ensName={ensName}
              address={session.address}
              copyable={true}
              shortForm={false}
              // identicon={avatarLink}
              size={64}
            /> */}

            <span>{session.address}</span>

            <Link
              href={`https://etherscan.io/address/${session.address}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Blockexplorer
            </Link>
            <Button color="secondary" variant="outlined" onClick={signOut}>
              Logout
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  )
}
