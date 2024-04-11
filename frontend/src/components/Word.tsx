interface WordProps {
    content: string
    compare: string
    completed: boolean
}

const Word = (wordProps: WordProps) => {

    const charArr = wordProps.content.split('')
    return (
        <div>
            {wordProps.completed ? 
            charArr.map((char, index) => <span className="text-green-500" key={index}>{char}</span>)
                :
            charArr.map((char, index) => <span key={index} className={index < wordProps.compare.length ? wordProps.content[index] === wordProps.compare[index]  ? 'text-green-500' : 'text-red-500' : 'text-black'}>{char}</span>)
            }
        </div>
    )
}

export default Word