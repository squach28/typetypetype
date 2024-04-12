import { useEffect, useState } from "react"
import Chat from "./components/Chat"
import TypingTest from "./components/TypingTest"
import ToggleChat from "./components/ToggleChat"
import { useSearchParams } from 'react-router-dom'
import { Socket, io } from "socket.io-client"

const App = () => {
  const [showChat, setShowChat] = useState<boolean>(true)
  const [searchParams,] = useSearchParams()
  const [socket, setSocket] = useState<Socket | null>(null)
  const roomId = searchParams.get('roomId')

  useEffect(() => {
    const connectToRoom = (roomId: string | null) => {
      if(roomId !== null) {
        const SOCKET_URL = import.meta.env.NODE_ENV === 'production' ? '' : `http://localhost:2000?roomId=${roomId}`

        const connection = roomId !== null ? io(SOCKET_URL, {
          query: {
            roomId
          }
        }) : null
    
        setSocket(connection)
      }

    }

    connectToRoom(roomId)

  }, [roomId])



  const toggleShowChat = () => {
    setShowChat(prev => !prev)
  }

  return (
    roomId && socket !== null ? 
      <div className="w-full min-h-screen flex bg-slate-900 text-white overflow-x-hidden">
        <a href="/" className="text-4xl p-4 block">typetypetype</a>
      <TypingTest socket={socket} />
        <div className="w-1/5 relative">
          <Chat socket={socket} showChat={showChat} />
          <ToggleChat showChat={showChat} toggleShowChat={toggleShowChat} />
        </div>

      
      </div>
    :
      <div>
        <p>Invalid room id</p>
      </div>
  )
}

export default App
