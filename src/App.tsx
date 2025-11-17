
import { useEffect, useState } from 'react'
import type { FC } from 'react'
import type { QuizFile } from './types.ts'
import { LOCALSTORAGE_LAST_QUIZ } from './types.ts'
import QuizLoader from './components/QuizLoader.tsx'

import q1 from './data/1.json'
import q2 from './data/2.json'
import q3 from './data/3.json'
import q4 from './data/4.json'

const ALL_QUIZZES: QuizFile[] = [q1 as QuizFile, q2 as QuizFile, q3 as QuizFile, q4 as QuizFile]

export const App: FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(() => {
    const raw = localStorage.getItem(LOCALSTORAGE_LAST_QUIZ)
    if (raw) {
      const idx = Number(raw)
      if (!Number.isNaN(idx) && idx >= 0 && idx < ALL_QUIZZES.length) {
        return idx
      }
    }
    return null
  })

  useEffect(() => {
    if (selectedIndex === null) {
      localStorage.removeItem(LOCALSTORAGE_LAST_QUIZ)
    } else {
      localStorage.setItem(LOCALSTORAGE_LAST_QUIZ, String(selectedIndex))
    }
  }, [selectedIndex])

  const currentData = selectedIndex !== null
    ? ALL_QUIZZES[selectedIndex]
    : null

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 dark:bg-slate-900 dark:text-slate-100">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">IESN Train — Quizzes</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Select a quiz to start. Your last open quiz is persisted.</p>
        </header>

        {selectedIndex === null ? (
          <div className="grid gap-4">
            {ALL_QUIZZES.map((q, i) => (
              <div key={i} className="bg-white p-4 rounded shadow flex items-center justify-between dark:bg-slate-800">
                <div>
                  <h2 className="font-semibold">{q.title}</h2>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled
                    className="px-3 py-1 rounded bg-slate-200 text-slate-700 text-sm dark:bg-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Read
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-indigo-600 text-white text-sm"
                    onClick={() => setSelectedIndex(i)}
                  >
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <button
                className="px-2 py-1 rounded bg-slate-200 text-slate-700 text-sm dark:bg-slate-700 dark:text-slate-200"
                onClick={() => setSelectedIndex(null)}
              >
                ← Back
              </button>
            </div>
            <div className="bg-white p-4 rounded shadow dark:bg-slate-800">
              <QuizLoader data={currentData!} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
