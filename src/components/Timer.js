import React, { useEffect } from 'react'
import { Alarm } from '@phosphor-icons/react/dist/ssr'

export default function Timer({ secondsRemaining, dispatch })
{
    const mins = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    useEffect(function ()
    {
        const id = setInterval(function ()
        {
            dispatch({ type: 'tick' })
        }, 1000);
        return () => clearInterval(id)
    }, [dispatch]);

    return (
        <div className='timer'>

            <div>
                {mins < 10 ? '0' : ''}
                {mins}
                :
                {seconds < 10 ? '0' : ''}
                {seconds}
            </div>
            <Alarm size={32} color="#f2f2f2" weight="fill" />
        </div>
    )
}
