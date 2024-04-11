import { useEffect, useState } from "react"
import { socket } from "../utils/socket"

const Chat = () => {
    const [chat, setChat] = useState<string[]>([])
    const [message, setMessage] = useState<string>('')
    useEffect(() => {
        socket.on('join', (...args: string[]) => {
            const user = args[0]
            const message = `${user} joined the room!`
            setChat(prev => [...prev, message])
        })

        socket.on('left', (...args: string[]) => {
            const user = args[0]
            const message = `${user} left the room.`
            setChat(prev => [...prev, message])
        })

        socket.on('message', (...args: string[]) => {
            const message = args[0]
            setChat(prev => [...prev, message])
        })

        return () => {
            socket.removeAllListeners()
        }
    }, [])

    const onMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(message !== '') {
            socket.emit('message', {
                userId: socket.id,
                content: message
            })
            setMessage('')
        }
    }

    return (
        <div className="flex flex-col bg-gray-800 w-1/5 h-full absolute right-0 top-0 p-4">
            <h1 className="text-white text-2xl">Chat</h1>
            <ul>
                {chat.map(msg => (
                    <li key={msg}>
                        {msg}
                    </li>
                ))}
            </ul>
            <form className="w-full mt-auto" onSubmit={onMessageSubmit}>
                <input
                    type="text"
                    className="w-full focus:outline-none p-1 text-black"
                    placeholder="Send a message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 p-1 mt-2 font-bold uppercase"
                >
                    Send
                </button>
            </form>
        </div>
    )
}

export default Chat