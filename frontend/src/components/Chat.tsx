import { useEffect, useState } from "react"
import { socket } from "../utils/socket"

const Chat = () => {
    const [chat, setChat] = useState<string[]>([])

    useEffect(() => {
        socket.on('join', (...args: string[]) => {
            const user = args[0]
            const message = `${user} joined the room!`
            setChat(prev => [...prev, message])
        })
    }, [])

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
        </div>
    )
}

export default Chat