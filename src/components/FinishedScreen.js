import React from 'react'
import { ArrowsClockwise } from '@phosphor-icons/react/dist/ssr';

export default function FinishedScreen({ points, maxPossiblePointes, highscore, dispatch })
{
    const percentage = Math.ceil((points / maxPossiblePointes) * 100);
    let emoji;

    if (percentage === 100) emoji = '🥇';
    if (percentage >= 80 && percentage < 100) emoji = '🥳';
    if (percentage >= 50 && percentage < 80) emoji = '😃';
    if (percentage >= 0 && percentage < 50) emoji = '🤨';
    if (percentage === 0) emoji = '🤦‍♂️';


    return (<>
        <p className='result'><span>{emoji}</span> You Scored <strong>{points}</strong> pout of {maxPossiblePointes} ({percentage}%)</p>
        <p className='highscore'>(Highscore: {highscore} points)</p>
        <button
            className='btn btn-ui'
            onClick={() =>
                dispatch({ type: "restart" })
            }>
            <ArrowsClockwise size={32} color="#fffafa" weight="bold" />
            Restart Quiz</button>
    </>
    )
}
