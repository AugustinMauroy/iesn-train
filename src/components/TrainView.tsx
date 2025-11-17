import type { FC } from "react";
import { useMemo, useState } from "react";
import type { QuizFile } from "../types";
import { shuffle } from "../utils/shuffle";

type Props = {
  data: QuizFile;
};

export const TrainView: FC<Props> = ({ data }) => {
  const [shuffleOn, setShuffleOn] = useState(false);
  const [showAnswers, setShowAnswers] = useState(true);
  // per-item reveal map for interactive reveal
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const items = useMemo(() => {
    // biome-ignore lint/suspicious/noExplicitAny: fuck it
    if (shuffleOn) return shuffle<any>(data.quiz as any);

    return data.quiz;
  }, [data, shuffleOn]);

  function toggleReveal(i: number) {
    setRevealed((r) => ({ ...r, [i]: !r[i] }));
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-2">{data.title} — Entraînement</h3>
      <div className="mb-3 flex items-center gap-2">
        <label className="text-sm text-slate-600 dark:text-slate-400">Mélanger</label>
        <button
          className={`px-2 py-1 rounded ${shuffleOn ? "bg-indigo-600 text-white" : "bg-slate-200 dark:bg-slate-700 dark:text-slate-200"}`}
          onClick={() => setShuffleOn((s) => !s)}
        >
          {shuffleOn ? "Activé" : "Désactivé"}
        </button>

        <div className="ml-4">
          <button
            className={`px-2 py-1 rounded ${showAnswers ? "bg-indigo-600 text-white" : "bg-slate-200 dark:bg-slate-700 dark:text-slate-200"}`}
            onClick={() => setShowAnswers((s) => !s)}
          >
            {showAnswers ? "Masquer les réponses" : "Afficher les réponses"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {data.type === "list" && (
          <ul className="list-disc pl-5">
            {(items as string[]).map((it, i) => (
              <li key={i} className="py-1">
                <div className="flex items-center justify-between">
                  <div>{it}</div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {data.type === "string-string" && (
          <div className="grid gap-2">
            {(items as [string, string][]).map((pair, i) => (
              <div
                key={i}
                className="p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800"
              >
                <div className="flex justify-between items-center">
                  <div className="font-medium">{pair[0]}</div>
                  <div className="ml-4 text-slate-500">
                    {showAnswers || revealed[i] ? pair[1] : "••••"}
                  </div>
                </div>
                {!showAnswers && (
                  <div className="mt-2">
                    <button
                      className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700"
                      onClick={() => toggleReveal(i)}
                    >
                      {revealed[i] ? "Masquer" : "Révéler"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {data.type === "date_year-string" && (
          <div className="grid gap-2">
            {(items as { date: string; string: string }[]).map((q, i) => (
              <div
                key={i}
                className="p-3 bg-slate-50 dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600 dark:text-slate-400">Texte</div>
                  <div className="font-medium">{q.string}</div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm text-slate-600 dark:text-slate-400">Date</div>
                  <div className="ml-4 text-slate-500">
                    {showAnswers || revealed[i] ? q.date : "••••"}
                  </div>
                </div>
                {!showAnswers && (
                  <div className="mt-2">
                    <button
                      className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700"
                      onClick={() => toggleReveal(i)}
                    >
                      {revealed[i] ? "Masquer" : "Révéler"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainView;
