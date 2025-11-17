import { useState, useEffect } from 'react'
import type { FC } from 'react'

type QuestionProps = {
    title: string
    question: Array<string>
}

/**
 */
export const QuizList: FC<QuestionProps> = ({ title, question }) => {
    const [answer, setAnswer] = useState('')
    const [answered, setAnswered] = useState<string[]>([])
    const [score, setScore] = useState(0)
    const [done, setDone] = useState(false)
    const [message, setMessage] = useState('')

    const submit = () => {
        const normalized = answer.trim().toLowerCase()

        // Normalize all questions for comparison
        const normalizedQuestions = question.map(q => q.trim().toLowerCase())

        const matchIndex = normalizedQuestions.findIndex(q => q === normalized)

        if (matchIndex !== -1 && !answered.includes(normalizedQuestions[matchIndex])) {
            setAnswered((a) => [...a, normalizedQuestions[matchIndex]])
            setScore((s) => s + 1)
            setMessage('Correct !')
        } else if (answered.includes(normalized)) {
            setMessage('Déjà répondu')
        } else {
            setMessage('Incorrect')
        }

        setAnswer('')
        if (answered.length + 1 >= question.length) {
            setDone(true)
            console.log('Quiz terminé')
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage('')
        }, 2000)
    }, [message])

    return (
        <div className="p-4">
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            {!done ? (
                <div>
                    <div className="mb-2 text-sm text-slate-600 dark:text-slate-400">Question {answered.length + 1} / {question.length}</div>
                    {message && <div className="mb-2 text-sm text-slate-700 dark:text-slate-300">{message}</div>}
                    {answered.length > 0 && (
                        <div className="mb-2 text-sm text-green-700 dark:text-green-300">
                            Déjà répondu : {answered.join(', ')}
                        </div>
                    )}
                    <input
                        className="w-full p-2 border rounded mb-2 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && submit()}
                        aria-label="answer"
                    />
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={submit}>Soumettre</button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="text-xl font-semibold">Terminé</div>
                    <div className="mt-2">Score : {score} / {question.length}</div>
                </div>
            )}
        </div>
    )
}