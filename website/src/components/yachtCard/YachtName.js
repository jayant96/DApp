import { Tooltip, Typography } from '@mui/material'
import React from 'react'

export default function YachtName({ name }) {
  // const getName = (y) => {
  //   const { metadata } = y
  //   const parsed = JSON.parse(metadata)
  //   return parsed.name
  // }

  const getShortVersion = (s) => {
    if (s.length > 22) {
      return s.slice(0, 21) + '…'
    }
    return s
  }

  if (name.length > 22) {
      return (
          <Tooltip title={name}>
              <Typography variant="h6">{getShortVersion(name)}</Typography>
          </Tooltip>
      )
  }

  return (<Typography variant="h6">{name}</Typography>)
}
