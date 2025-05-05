import React from "react";

const Start = ({ numQuestions }) => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <p>{numQuestions} questions to test your React mastery</p>
      <button className="btn">Let's Start!</button>
    </div>
  );
};

export default Start;
