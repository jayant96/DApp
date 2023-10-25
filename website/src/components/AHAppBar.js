import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Account from './Account'
import ahAnchorLogo from './ApeHarbourLogo_small.png'
import { Link } from 'react-router-dom'
import { color } from '@mui/system'
import { Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function AHAppBar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component="a" href="/harbourmanagement">
          Manage Your Yachts
        </ListItem>
        <ListItem button component="a" href="/collections">
          Collections
        </ListItem>
        <ListItem button component="a" href="https://store.apeharbour.com">
          Merch
        </ListItem>
      </List>
    </Box>
  );

  return (

    <AppBar position="sticky" sx={{ backgroundImage: 'linear-gradient(to right, #61ffea, #4db7d4)'}}>
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ display: { xs: 'inline-flex', sm: 'none' }, mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        href="/"
      >
        <Box
          component="img"
          sx={{ width: '48px' }}
          src={ahAnchorLogo}
          alt="Ape Harbour Logo"
        />
        <Typography
          variant="button"
          component="span"
          sx={{display: {xs: 'none', sm: 'flex'}, fontWeight: 900}}
        >
          APE HARBOUR
        </Typography>
      </IconButton>
      <Box flexGrow={1}>
        <Button color="inherit" href="/harbourmanagement" sx={{display: {xs: 'none', sm: 'inline-flex'}}}>
          Manage Your Yachts
        </Button>
        <Button color="inherit" href="/collections" sx={{display: {xs: 'none', sm: 'inline-flex'}}}>
          Collections
        </Button>
        <Button color="inherit" href="https://store.apeharbour.com" sx={{display: {xs: 'none', sm: 'inline-flex'}}}>
          Merch
        </Button>
        <Drawer anchor={'left'} open={isOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </Box>
      <Box flexGrow={0} color="inherit" sx={{cursor: 'pointer'}}>
        <Account />
      </Box>
    </Toolbar>
  </AppBar>
  )
}
