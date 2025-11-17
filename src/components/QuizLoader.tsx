import type { FC } from "react";
import { useMemo } from "react";
import { QuizDateYearString } from "../layout/QuizDateYearString";
import { QuizList } from "../layout/QuizList";
import { QuizStringString } from "../layout/QuizStringString";
import type { QuizFile } from "../types";
import { shuffle } from "../utils/shuffle";

type Props = {
  data: QuizFile;
};

export const QuizLoader: FC<Props> = ({ data }) => {
  // biome-ignore lint/suspicious/noExplicitAny: fuck it
  const shuffled = useMemo(() => shuffle<any>(data.quiz), [data]);

  switch (data.type) {
    case "list":
      return <QuizList title={data.title} question={shuffled as string[]} />;
    case "date_year-string":
      return <QuizDateYearString title={data.title} question={shuffled} />;
    case "string-string":
      return <QuizStringString title={data.title} question={shuffled} />;
    default:
      return <div className="p-4 text-red-600">Unknown quiz type</div>;
  }
};

export default QuizLoader;
