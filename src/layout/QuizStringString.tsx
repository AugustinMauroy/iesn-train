import { useState } from 'react'
import type { FC } from 'react'

type QuestionProps = {
    title: string
    question: Array<[string, string]>
}

export const QuizStringString: FC<QuestionProps> = ({ title, question }) => {
    const [index, setIndex] = useState(0)
    const [flip, setFlip] = useState(false)
    const [input, setInput] = useState('')
    const [score, setScore] = useState(0)
    const [done, setDone] = useState(false)

    const current = question[index]

    const submit = () => {
        const expected = flip ? current[0] : current[1]
        if (input.trim().toLowerCase() === expected.trim().toLowerCase()) {
            setScore((s) => s + 1)
        }
        setInput('')
        if (index + 1 >= question.length) setDone(true)
        else setIndex((i) => i + 1)
    }

    const reset = () => {
        setIndex(0)
        setInput('')
        setScore(0)
        setDone(false)
    }

    return (
        <div className="p-4">
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <div className="mb-3 flex items-center gap-2">
                {!done ? <button
                    className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 dark:text-slate-200"
                    onClick={() => setFlip((f) => !f)}
                >
                    Swap direction
                </button> :
                <button
                    className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 dark:text-slate-200"
                    onClick={() => reset()}
                >
                    Re-do
                </button>
                }
            </div>

            {!done ? (
                <div>
                    <div className="mb-2 text-sm text-slate-600 dark:text-slate-400">Question {index + 1} / {question.length}</div>
                    <div className="mb-3 p-3 bg-slate-100 dark:bg-slate-800 rounded">{flip ? current[1] : current[0]}</div>
                    <input
                        className="w-full p-2 border rounded mb-2 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && submit()}
                    />
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={submit}>Submit</button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="text-xl font-semibold">Done</div>
                    <div className="mt-2">Score: {score} / {question.length}</div>
                </div>
            )}
        </div>
    )
}

export default QuizStringString