import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from "@mui/material"
import { useState } from "react"

const Home = () => {
    const [showCreateRoom, setShowCreateRoom] = useState<boolean>(false)
    const [requirePassword, setRequirePassword] = useState<boolean>(false)

    const handleCreateRoomClick = () => {
      setShowCreateRoom(true)
    }

    const handleCreateRoomClose = () => {
      setShowCreateRoom(false)
    }

    const handleRequirePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRequirePassword(e.target.checked)
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
                required
                fullWidth
                label="Room Password"
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
            <Button>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}

export default Home