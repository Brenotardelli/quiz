import React from "react";
import { useQuiz } from "../context/QuizContext";

const Finish = () => {
  const { points, maxPoints, dispatch } = useQuiz();
  const percentScore = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentScore)}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default Finish;
