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
    <div className="w-full min-h-screen flex bg-slate-900 text-white overflow-x-hidden">
      <a href="/" className="text-4xl p-4 block">typetypetype</a>
      <TypingTest />
        <div className="w-1/5 relative">
          <Chat showChat={showChat} />
          <ToggleChat showChat={showChat} toggleShowChat={toggleShowChat} />
        </div>

      
    </div>
  )
}

export default App
