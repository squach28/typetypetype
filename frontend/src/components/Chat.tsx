import { useEffect, useMemo, useState } from "react"
import { socket } from "../utils/socket"
import { Message, MessageType } from "../types/Message"

interface ChatProps {
    showChat: boolean
}

const Chat = (props: ChatProps) => {
    const [chat, setChat] = useState<Message[]>([])
    const [message, setMessage] = useState<string>('')
    const messages = useMemo(() => {
        const renderMessage = (message: Message) => {
            switch(message.type) {
                case MessageType.MESSAGE:
                    return (
                        <li key={message.id} className="break-all">
                            <span>{message.nickname}: </span>
                            <span>{message.content}</span>
                        </li>
                    )
                case MessageType.JOIN:
                    return(
                        <li key={message.id} className="break-all font-bold text-green-500">
                            <p>{message.nickname} joined the room!</p>
                        </li>
                    )
                case MessageType.LEAVE:
                    return(
                        <li key={message.id} className="break-all font-bold text-red-500">
                            <p>{message.nickname} left the room.</p>
                        </li>
                    )
                default:
                    return null
            }
        }

        const renderMessages = () => {
            return(
                chat.map(message => 
                   renderMessage(message)
                )
            )
    
        }
        return renderMessages()
    }, [chat])

    useEffect(() => {
        socket.on('join', (...args: Message[]) => {
            const message = args[0]
            setChat(prev => [...prev, message])
        })

        socket.on('left', (...args: Message[]) => {
            const message = args[0]
            setChat(prev => [...prev, message])
        })

        socket.on('message', (...args: Message[]) => {
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
                socketId: socket.id,
                content: message
            })
            setMessage('')
        }
    }

    return (
        <div className={`flex flex-col bg-gray-800 w-full h-screen p-4 flex-wrap z-20 shadow-2xl ${props.showChat ? 'relative' : 'opacity-0'}`}>
            <h1 className="text-white text-2xl font-bold">Chat</h1>
            <hr className="my-2" />
            <ul>
                {messages}
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