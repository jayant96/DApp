import * as React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

export default function OgYachts(props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="overline" textAlign="end" component="div">
          {props.caption}
        </Typography>
          <Typography variant='h3' textAlign="end">
            {props.value}
          </Typography>
      </CardContent>
    </Card>
  )
}
