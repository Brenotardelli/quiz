import React from "react";
import { useQuiz } from "../context/QuizContext";

const Start = () => {
  const { numQuestions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Think you're a real gamer? Take The Gamer Quiz and prove it!</h2>
      <p>{numQuestions} questions to level up your gaming mastery</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Start Playing
      </button>
    </div>
  );
};

export default Start;
