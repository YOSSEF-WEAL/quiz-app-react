import React from 'react'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export default function NextButton({ dispatch, answer, numQuestions, index })
{
    if (answer === null) return null;

    if (index < numQuestions - 1) return (
        <button className='btn btn-ui' onClick={() => dispatch({ type: "nextQuestion" })}>
            Next
            <ArrowRight size={32} color="#fffafa" weight="bold" />
        </button>
    )
    if (index === numQuestions - 1) return (
        <button className='btn btn-ui' onClick={() => dispatch({ type: "finished" })}>Finish</button>
    )
}
