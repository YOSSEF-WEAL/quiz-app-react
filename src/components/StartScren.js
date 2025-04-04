import { Play } from '@phosphor-icons/react/dist/ssr'
import React from 'react'

export default function StartScren({ numQuestions, dispatch })
{
    return (
        <div className='start'>
            <h2>Welcom to The React Quiz!</h2>
            <h3>{numQuestions} questions to test your React mastry</h3>
            <button className='btn btn-ui' onClick={() => dispatch({ type: 'start' })}>
                Let's Start
                <Play size={32} color="#f2f2f2" weight="fill" />

            </button>
        </div>
    )
}
