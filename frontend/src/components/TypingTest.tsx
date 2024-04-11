import { useState } from "react"
import Word from "./Word"

const TypingTest = () => {
    const [active, setActive] = useState(0)
    const [words,] = useState(['hello ', 'world ', 'hi '])
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
        <div className="w-full flex flex-col justify-center items-center">
            <ul className="flex gap-2">
                {words.map((word, index) => 
                index === active ? 
                <Word key={index} content={word} compare={curr} completed={completed[index]} />
                    :
                <Word key={index} content={word} compare={''} completed={completed[index]} />
                )}
            </ul>
            <input 
                className="bg-white border w-1/4"
                type="text"
                onChange={onWordChange}
                value={curr} />
        </div>
    )
}

export default TypingTest