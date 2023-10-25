import { Backdrop, CircularProgress } from '@mui/material'
import * as React from 'react'
import { Outlet } from 'react-router-dom'

export default function FullscreenBackdrop(props) {
  return (
    <Backdrop
      sx={{
        zIndex: 10000000,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#ffffff',
      }}
      open={props.open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
