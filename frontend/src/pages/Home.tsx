import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from "@mui/material"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CreateRoomRes } from "../types/CreateRoomRes"

const Home = () => {
    const [showCreateRoom, setShowCreateRoom] = useState<boolean>(false)
    const [requirePassword, setRequirePassword] = useState<boolean>(false)
    const [roomName, setRoomName] = useState<string>('')
    const [roomPassword, setRoomPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()    
    const [errors, setErrors] = useState({
      roomName: '',
      roomPassword: ''
    })

    const handleCreateRoomClick = () => {
      setShowCreateRoom(true)
    }

    const handleCreateRoomClose = () => {
      setShowCreateRoom(false)
      setRequirePassword(false)
      setRoomPassword('')
      setRoomName('')
    }

    const handleRequirePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRequirePassword(e.target.checked)
      if(!e.target.checked) {
        setRoomPassword('')
        setErrors({
          ...errors,
          roomPassword: ''
        })
      }
    }

    const onRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.value !== '') {
        setErrors({
          ...errors,
          roomName: ''
        })
      } else {
        setErrors({
          ...errors,
          roomName: 'Room name is required'
        })
      }
      setRoomName(e.target.value)
    }

    const onRoomPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(requirePassword && e.target.value !== '') {
        setErrors({
          ...errors,
          roomPassword: ''
        })
      } else if(requirePassword && e.target.value === '') {
        setErrors({
          ...errors,
          roomPassword: 'Password is required if checked'
        })
      }
      setRoomPassword(e.target.value)
    }

    const onCreateRoomClick = () => {
      if(roomName === '') {
        setErrors({
          ...errors,
          roomName: 'Room name is required'
        })
        return
      }

      if(requirePassword && roomPassword === '') {
        setErrors({
          ...errors,
          roomPassword: 'Password is required if checked'
        })
        return
      }

      createRoom(roomName, roomPassword)
    }

    const createRoom = async (name: string, password = '') => {
      try {
        const body = {
          name,
          password
        }
        fetch(`${import.meta.env.VITE_API_URL}/room`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
          .then(res => res.json())
          .then((data: CreateRoomRes) => {
            const { id } = data
            navigate(`/room/${id}`, { replace: true })
          })
          
      } catch(e) {
        console.log(e)
      }
    }

    return (
      <div className="bg-gray-700 text-white min-h-screen">
        <h1>typetypetype</h1> 
        <div className="flex flex-col justify-center items-center gap-4 my-8">
          <p className="text-2xl font-bold">Compete with your friends to see who truly is the typing master</p>
          <div className="flex gap-8">
            <button className="border p-2 m-1 text-2xl" onClick={handleCreateRoomClick}>Create Room</button>
            <button className="border p-2 m-1 text-2xl">Join Room</button>
          </div>
        </div>
        <Dialog
          open={showCreateRoom}
          onClose={handleCreateRoomClose}
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogTitle>Create Room</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              label="Room name"
              required
              fullWidth
              value={roomName}
              onChange={onRoomNameChange}
              error={errors.roomName === '' ? false : true }
              helperText={errors.roomName === '' ? null : errors.roomName}
              sx={{
                marginTop: 2
              }}
            />
            <FormControlLabel 
              control={<Checkbox checked={requirePassword} onChange={handleRequirePasswordChange} />}
              label="Require Password?"
              sx={{
                marginTop: 2
              }}
            />
            {requirePassword ? 
              <TextField
                autoFocus
                required
                fullWidth
                value={roomPassword}
                onChange={onRoomPasswordChange}
                label="Room Password"
                error={errors.roomPassword === '' ? false: true }
                helperText={errors.roomPassword === '' ? null : errors.roomPassword}
                sx={{
                  marginTop: 2
                }}
              />
                :
              null
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateRoomClose}>Cancel</Button>
            <Button onClick={onCreateRoomClick}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}

export default Home