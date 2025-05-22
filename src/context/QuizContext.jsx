import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload.results.map((q) => {
          const options = shuffle([q.correct_answer, ...q.incorrect_answers]);
          return {
            ...q,
            options,
            correctOption: options.indexOf(q.correct_answer),
            points: 10,
          };
        }),
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer": {
      const question = state.questions.at(state.index);
      const isCorrect = action.payload === question.correctOption;
      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
      };
    }

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return { ...state, status: "finished" };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action");
  }
}

const QuizProvider = ({ children }) => {
  const [
    { questions, status, index, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        secondsRemaining,
        numQuestions,
        maxPoints,
        decodeHtml,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("useQuestion was used outside of the PostProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { QuizProvider, useQuiz };
