import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faDiscord,
  faMedium,
} from '@fortawesome/free-brands-svg-icons'
import { Box, Button, IconButton, Link, Stack,  useTheme, useMediaQuery, Grid } from '@mui/material'
import * as React from 'react'
import Copyright from './Copyright'
import { styled } from '@mui/system';

const CustomButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.85rem',
  },
}));

export default function Footer(props) {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
   <Box>
    {!isMobile && 
    <Stack
    sx={{ backgroundColor: 'grey.500'}}
    p={2}
    direction="row"
    justifyContent="space-between"
  >
    <Stack direction="row" spacing={2} alignItems='center'>
      <Copyright />
      <Button href='/imprint' color='inherit'>Imprint</Button>
      <Button href='/terms' color='inherit'>Terms & Conditions</Button>
    </Stack>
    <Stack direction="row" alignItems='center'>
      <IconButton color='inherit' size='medium' href="https://twitter.com/ApeHarbour">
        <FontAwesomeIcon icon={faTwitter} />
      </IconButton>

      <IconButton color='inherit' size='medium' href="http://discord.gg/MGPNvCYXmu">
        <FontAwesomeIcon icon={faDiscord} />
      </IconButton>

      <IconButton color='inherit' size='medium' href="https://medium.com/@ApeHarbour">
        <FontAwesomeIcon icon={faMedium} />
      </IconButton>
    </Stack>
  </Stack>
  }

  {isMobile &&
   
<Stack
sx={{ backgroundColor: 'grey.500'}}
p={0.3}
direction="row"
justifyContent="space-between"
>
<Stack direction="row" spacing={isMobile ? 1 : 2 } alignItems='center'>
  <Copyright />
  <CustomButton href='/imprint' color='inherit'>Imprint</CustomButton>
  {!isMobile &&
  <CustomButton href='/terms' color='inherit'>Terms & Conditions</CustomButton>
  }
   {isMobile &&
  <CustomButton href='/terms' color='inherit'>T & C</CustomButton>
  }
</Stack>
      <Stack direction="column" alignItems='flex-end'>
        <IconButton color='inherit' size={isMobile? 'small' : 'medium' } href="https://twitter.com/ApeHarbour">
          <FontAwesomeIcon icon={faTwitter} />
        </IconButton>

        <IconButton color='inherit' size={isMobile? 'small' : 'medium' } href="http://discord.gg/MGPNvCYXmu">
          <FontAwesomeIcon icon={faDiscord} />
        </IconButton>

        <IconButton color='inherit' size={isMobile? 'small' : 'medium' } href="https://medium.com/@ApeHarbour">
          <FontAwesomeIcon icon={faMedium} />
        </IconButton>
      </Stack>
    </Stack>
    }
    </Box> 
  )
}
