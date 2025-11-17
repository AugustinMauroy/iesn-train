import type { FC } from 'react'
import { useMemo } from 'react'
import type { QuizFile } from '../types'
import { QuizList } from '../layout/QuizList'
import { QuizDateYearString } from '../layout/QuizDateYearString'
import { QuizStringString } from '../layout/QuizStringString'
import { shuffle } from '../utils/shuffle'

type Props = {
  data: QuizFile
}

export const QuizLoader: FC<Props> = ({ data }) => {
  // Shuffle questions once when the quiz data is provided
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shuffled = useMemo(() => shuffle<any>(data.quiz), [data])

  switch (data.type) {
    case 'list':
      return <QuizList title={data.title} question={shuffled as string[]} />
    case 'date_year-string':
      return <QuizDateYearString title={data.title} question={shuffled} />
    case 'string-string':
      return <QuizStringString title={data.title} question={shuffled} />
    default:
      return <div className="p-4 text-red-600">Unknown quiz type</div>
  }
}

export default QuizLoader
