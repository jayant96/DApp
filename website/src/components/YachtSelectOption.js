import * as React from 'react'
import { Box, Typography } from '@mui/material'

import triangle from '../shared_assets/Triangle.svg'
import checkmark from '../shared_assets/circle-check.svg'

function Checkmark(props) {
  return (
    <Box
      onClick={props.onClick}
      // yachtType={props.yachtType}
      visibility={props.selected ? 'visible' : 'hidden'}
      component="img"
      src={checkmark}
      sx={{
        '&:hover': {
          cursor: 'pointer',
        },
        width: props.width,
        position: 'absolute',
        left: props.left,
        top: props.top,
      }}
    />
  )
}

export default function YachtSelectOption(props) {
  return (
    <Box
      sx={{
        textAlign: 'center'
      }}
    >
      <Box
        sx={{
          width: '160px',
          background: 'white',
          position: 'relative',
          '&:before': {
            content: `url(${triangle})`,
            width: '10px',
            height: '10px',
            position: 'absolute',
            top: '29px',
            right: '-10px',
          },
          '&:after': {
            position: 'absolute',
            content: `"${props.remaining} left"`,
            top: '13px',
            right: '-10px',
            padding: '0.2rem',
            width: '6rem',
            fontSize: '0.9rem',
            backgroundColor: 'primary.main',
            textAlign: 'center',
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            component="img"
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
              width: '160px',
            }}
            src={props.imgSrc}
            alt="Silver Sportsyacht"
            onClick={() => props.handleClick(props.color)}
          />
          <Checkmark
            selected={props.selected}
            width="120px"
            left="20px"
            top="20px"
            onClick={() => props.handleClick(props.color)}
          />
        </Box>
      </Box>
      <Typography variant="body2">Sportsyacht {props.color}</Typography>
    </Box>
  )
}
