import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import Blockies from 'react-blockies'
import { Avatar, IconButton, Stack, Tooltip, Typography } from '@mui/material'

export default function Address(props) {
  const shortenHexString = (s) => {
    if (s === null || s === '') {
      return ''
    }
    return s.slice(0, 6).concat('…', s.slice(s.length - 4))
  }

  const copyString = (s) => {
    console.log('Copied', s)
    navigator.clipboard.writeText(s)
  }

  if (props.ensName == '') {
    return (
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        onClick={() => props.onClick(true)}
      >
        {props.identicon && (
          <Avatar sx={{ height: props.size, width: props.size }} src={props.identicon} />
        )}
        {!props.identicon && (
          <Avatar sx={{ height: props.size, width: props.size }}>
            <Blockies seed={props.address} scale={props.size/8} size={8} />
          </Avatar>
        )}

        <Tooltip title={props.address}>
          <Stack direction="row" alignItems="center">
            <Typography variant="body2" color="inherit">
              {props.shortForm
                ? shortenHexString(props.address)
                : props.address}
            </Typography>
            {props.copyable && (
              <IconButton onClick={() => copyString(props.address)}>
                <FontAwesomeIcon icon={faCopy} size="2xs"></FontAwesomeIcon>
              </IconButton>
            )}
          </Stack>
        </Tooltip>
      </Stack>
    )
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      onClick={props.onClick}
    >
        {props.identicon && (
          <Avatar sx={{ height: props.size, width: props.size }} src={props.identicon} />
        )}
        {!props.identicon && (
          <Avatar sx={{ height: props.size, width: props.size }}>
            <Blockies seed={props.address} scale={props.size/8} size={8} />
          </Avatar>
        )}

      <Stack>
        <Typography variant="body2" color="inherit">
          {props.ensName}
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography variant="caption" color="inherit">
            {props.shortForm ? shortenHexString(props.address) : props.address}
          </Typography>
          {props.copyable && (
            <IconButton onClick={() => copyString(props.address)}>
              <FontAwesomeIcon icon={faCopy} size="2xs"></FontAwesomeIcon>
            </IconButton>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
