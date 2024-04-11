import Chat from "./components/Chat"
import TypingTest from "./components/TypingTest"

const App = () => {
  return (
    <div className="w-full min-h-screen max-h-screen bg-gray-900 text-white">
      <a href="/" className="text-4xl p-4 block">typetypetype</a>
      <TypingTest />
      <Chat />
    </div>
  )
}

export default App
