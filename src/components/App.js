import { React, useEffect, useReducer } from 'react';
import questionsData from '../data/questions.json';

import Header from "./Header";
import Main from "./Main";
import Loader from './Loader';
import Error from './Error';
import StartScren from './StartScren';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishedScreen from './FinishedScreen';
import Footer from './Footer';
import Timer from './Timer';
import RestartButton from './RestartButton';
const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  // 'loding', 'error', 'ready', 'active', 'finished'
  status: 'loding',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 10,
};
function reducer(state, action)
{
  switch (action.type)
  {
    case 'dataReceived': return {
      ...state, questions: action.payload,
      status: "ready",
    };

    case 'dataFaild': return {
      ...state,
      status: "error",
    }

    case 'start': return {
      ...state,
      status: "active",
      secondsRemaining: state.questions.length * SECS_PER_QUESTION,
    }
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      }
    case 'nextQuestion': return { ...state, index: state.index + 1, answer: null }

    case "finished": return { ...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore }

    case "restart": return { ...initialState, questions: state.questions, status: 'ready' }

    case "tick": return { ...state, secondsRemaining: state.secondsRemaining - 1, status: state.secondsRemaining === 0 ? 'finished' : state.status }

    default: throw new Error('Action unkonwn');
  }
}

export default function App()
{

  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePointes = questions.reduce((prev, cur) => prev + cur.points, 0)

  /*
  
  useEffect(function ()
  {
    fetch(`http://localhost:8000/questions`)
    .then(res => res.json())
    .then(data => dispatch({ type: 'dataReceived', payload: data }))
    .catch(error => dispatch({ type: "error" }));
  }, []);
  
  */

  useEffect(function ()
  {
    dispatch({ type: 'dataReceived', payload: questionsData.questions });
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loding' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScren numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' &&
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePointes={maxPossiblePointes} answer={answer} />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />

              <RestartButton dispatch={dispatch} index={index} numQuestions={numQuestions} answer={answer} />

              <NextButton dispatch={dispatch} answer={answer} numQuestions={numQuestions} index={index} />
            </Footer>
          </>
        }
      </Main>
      {status === 'finished' && <FinishedScreen points={points} maxPossiblePointes={maxPossiblePointes} highscore={highscore} dispatch={dispatch} />}
    </div>
  );
}
