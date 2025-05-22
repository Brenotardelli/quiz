import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Content from "./Content";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import Timer from "./Timer";
import Footer from "./Footer";
import { useQuiz } from "../context/QuizContext";

const App = () => {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Content>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <Start />}
        {status === "active" && (
          <>
            <Progress />
            <Questions />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <Finish />}
      </Content>
    </div>
  );
};

export default App;
