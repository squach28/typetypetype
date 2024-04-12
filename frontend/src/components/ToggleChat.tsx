import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa"

interface ToggleChatProps {
    showChat: boolean
    toggleShowChat: () => void
}

const ToggleChat = (props: ToggleChatProps) => {
    return (
        <div className={`w-16 h-16 bg-purple-700 absolute ${props.showChat ? 'left-[-2rem] top-12 z-10' : ' right-[-1.75rem] top-12'}  flex pl-2 rounded-l-md rounded-b-md items-center overflow-hidden hover:cursor-pointer`} onClick={props.toggleShowChat}>
              {props.showChat ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </div>
    )
}

export default ToggleChat