import { useState } from "react"
import Chat from "./components/Chat"
import TypingTest from "./components/TypingTest"
import ToggleChat from "./components/ToggleChat"

const App = () => {
  const [showChat, setShowChat] = useState<boolean>(true)

  const toggleShowChat = () => {
    setShowChat(prev => !prev)
  }


  return (
    <div className="w-full min-h-screen flex bg-gray-900 text-white overflow-x-hidden">
      <a href="/" className="text-4xl p-4 block">typetypetype</a>
      <TypingTest />
      {
        showChat ?
          <div className="w-1/5 relative">
            <Chat />
            <ToggleChat showChat={showChat} toggleShowChat={toggleShowChat} />
          </div>
        :
        <ToggleChat showChat={showChat} toggleShowChat={toggleShowChat} />
      }
    </div>
  )
}

export default App
