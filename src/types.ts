export type DateYearQuestion = {
  date: string;
  string: string;
};

export type StringPair = [string, string];

export type QuizFile =
  | { title: string; type: "date_year-string"; quiz: DateYearQuestion[] }
  | { title: string; type: "list"; quiz: string[] }
  | { title: string; type: "string-string"; quiz: StringPair[] };

export const LOCALSTORAGE_LAST_QUIZ = "iesn:lastQuiz";
