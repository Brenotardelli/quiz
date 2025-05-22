import React from "react";
import { useQuiz } from "../context/QuizContext";

const Options = ({ question }) => {
  const { dispatch, answer, decodeHtml } = useQuiz();
  const hasAnswered = answer !== null;

  if (!question?.options) return null;
  return (
    <div>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={option}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={hasAnswered}
          >
            {decodeHtml(option)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Options;
