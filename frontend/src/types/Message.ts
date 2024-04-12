export enum MessageType {
    MESSAGE = 'message',
    JOIN = 'join',
    LEAVE = 'leave'
}

export type Message = {
    id: string
    type: MessageType
    socketId: string
    nickname: string
    content: string
}