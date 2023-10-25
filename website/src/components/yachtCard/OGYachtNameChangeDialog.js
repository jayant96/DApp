import * as React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


export default function OGYachtNameChangeDialog(props) {

  const closeDialog = () => {
    props.handleClose(false)
  }

  const [newYachtName, setNewYachtName] = React.useState('')

  const handleChange = (e) => {
    console.log('Updating yacht name')
    setNewYachtName(e.target.value)
  }

  const handleOK = () => {
    console.log('Setting new name to', newYachtName)
    props.handleChangeName(newYachtName)
  }

  return (
    <Dialog open={props.open} onClose={closeDialog}>
      <DialogTitle>Change Yacht Name

      <IconButton
            aria-label="close"
            onClick={closeDialog}
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
        <DialogContentText>
          You can change your yacht's name directly on-chain. The name will
          display on the marketplaces (like Opensea or Looksrare) once you
          refresh their metadata. Setting a name for a yacht requries an on-chain
          transaction and you will have to pay for the transaction fees.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="yachtName"
          label="New Yacht Name"
          type="text"
          color='secondary'
          fullWidth
          value={newYachtName}
          variant="standard"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={closeDialog}>Cancel</Button>
        <Button color='secondary' onClick={handleOK}>Change Name</Button>
      </DialogActions>
    </Dialog>
  )
}
