import React from "react";

const Finish = ({ points, maxPoints }) => {
  const percentScore = (points / maxPoints) * 100;
  return (
    <p className="result">
      You Scored <strong>{points}</strong> out of {maxPoints} (
      {Math.ceil(percentScore)}%)
    </p>
  );
};

export default Finish;
