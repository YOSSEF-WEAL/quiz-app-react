import React from 'react'
import { ArrowsClockwise } from '@phosphor-icons/react/dist/ssr';

export default function RestartButton({ dispatch, index, numQuestions, answer })
{
    if (answer === null) return null;

    if (index < numQuestions - 1) return (
        <button className='btn' onClick={() =>
            dispatch({ type: "restart" })
        }>
            Restart
            <ArrowsClockwise size={32} color="#fffafa" weight="bold" />
        </button>
    )
}
