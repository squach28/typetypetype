import { useState } from "react"
import Chat from "./components/Chat"
import TypingTest from "./components/TypingTest"
import ToggleChat from "./components/ToggleChat"
import { useSearchParams } from 'react-router-dom'
import { io } from "socket.io-client"

const App = () => {
  const [showChat, setShowChat] = useState<boolean>(true)
  const toggleShowChat = () => {
    setShowChat(prev => !prev)
  }

  const [searchParams,] = useSearchParams()
  const roomId = searchParams.get('roomId')

  const SOCKET_URL = import.meta.env.NODE_ENV === 'production' ? '' : `http://localhost:2000?roomId=${roomId}`

  const socket = roomId !== null ? io(SOCKET_URL, {
    query: {
      roomId
    }
  }) : null

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
