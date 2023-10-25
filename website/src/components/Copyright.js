import * as React from 'react';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/system';

const CustomButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

export default function Copyright() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    // <Typography variant="body1">
    //   {'© '}
    //   <Link color="inherit" href="https://laidback.ventures/">
    //     Laid Back Ventures
    //   </Link>{' '}
    //   {new Date().getFullYear()}
    // </Typography>
    <CustomButton color='inherit' href='https://laidback.ventures' size={isMobile ? 'small' : 'medium'}>© Laid Back Ventures {new Date().getFullYear()}</CustomButton>
  );
}