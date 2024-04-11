import { useState } from "react"
import Word from "./Word"

const TypingTest = () => {
    const [active, setActive] = useState(0)
    const [words,] = useState(['hello ', 'world ', 'hi ', 'hello ', 'hello ', 'world ', 'hi ', 'hello ', 'hello ', 'world ', 'hi ', 'hello ', 'hello ', 'world ', 'hi ', 'hello ', 'hello ', 'world ', 'hi ', 'hello '])
    const [completed, setCompleted] = useState([false, false, false])
    const [curr, setCurr] = useState('')

    const onWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setCurr(() => {
            if(e.target.value === words[active]) {
                setCompleted(prev => {
                    prev[active] = true
                    return prev
                })
                setActive(prev => prev + 1)
                return ''
            }
            return e.target.value
        })
    }

    return (
        <div className="w-1/2 mx-auto flex flex-col justify-center items-center">
            <ul className="flex gap-2 bg-gray-700 w-full p-2 my-2 flex-wrap">
                {words.map((word, index) => 
                index === active ? 
                <Word key={index} content={word} compare={curr} completed={completed[index]} />
                    :
                <Word key={index} content={word} compare={''} completed={completed[index]} />
                )}
            </ul>
            <input 
                className="bg-white border w-1/4 p-1 rounded-md focus:outline-none focus:bg-gray-200"
                type="text"
                onChange={onWordChange}
                placeholder="Type word here..."
                value={curr} />
        </div>
    )
}

export default TypingTest