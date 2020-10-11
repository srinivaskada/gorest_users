import { Box, Button, TextField } from '@material-ui/core'
import React, { useEffect, useContext, useState } from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { BASE_URL } from '../environment';

const EditUserDialog = (props) => {
  const { onClose, onUpdate} = props
  const [user, setUser] = useState(props.user)
  const customUserSetter = newState => setUser(ps => ({
    ...ps,
    ...newState
  }))
  const updateUser = async () => {
    try {
      const response = await window.fetch(
        `${BASE_URL}/users/${user.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        }
      )
      const responseJson = await response.json()
      onUpdate()
    } catch(ex) {
      console.log(ex)
      alert('Unable to update user')
    }
  }
  return (
    <>
      <TextField
        margin="dense"
        id="name"
        label="Name"
        fullWidth
        value={user.name}
      />
      <TextField
        margin="dense"
        id="email"
        label="Email Address"
        type="email"
        fullWidth
        value={user.email}
      />
      <ToggleButtonGroup
        value={user.gender}
        exclusive
        onChange={(_, gender) => customUserSetter({ gender })}
        aria-label="text alignment"
      >
        <ToggleButton value="male" aria-label="male">
          Male
        </ToggleButton>
        <ToggleButton value="female" aria-label="female">
          Femail
        </ToggleButton>
      </ToggleButtonGroup>
      <p />
      <ToggleButtonGroup
        value={user.status}
        exclusive
        onChange={(_, status) => customUserSetter({ status })}
        aria-label="text alignment"
      >
        <ToggleButton value="active" aria-label="Active">
          Active
        </ToggleButton>
        <ToggleButton value="inactive" aria-label="Inactive">
          Inactive
        </ToggleButton>
      </ToggleButtonGroup>
      <p />
      <Box display='flex'>
        <Box flex={1} />
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => updateUser()} color="primary" variant='contained'>
          Update
        </Button>
      </Box>
    </>
  )
}

export default EditUserDialog