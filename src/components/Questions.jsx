import React from "react";
import Options from "./Options";
import { useQuiz } from "../context/QuizContext";

const Questions = () => {
  const { questions, index, decodeHtml } = useQuiz();
  const currentQuestion = questions.at(index);

  return (
    <div>
      <h4>{decodeHtml(currentQuestion.question)}</h4>
      <Options question={currentQuestion} />
    </div>
  );
};

export default Questions;
