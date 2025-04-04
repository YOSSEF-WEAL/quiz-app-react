import React from 'react'

export default function Options({ question, dispatch, answer })
{

    const hasAnswerd = answer !== null;

    return (
        <div className='options'>
            {question.options
                .map((option, index) => <button
                    className={`btn btn-option 
                        ${index === answer ? "answer" : ''} 
                        ${index === answer ?
                            index === question.correctOption ?
                                'correct' : "wrongMyAnswer" : ""}
                        ${answer !== null ?
                            index === question.correctOption ?
                                'correct' : "wrong" : ""}
                        `}
                    key={option}
                    disabled={hasAnswerd}
                    onClick={() => dispatch({ type: 'newAnswer', payload: index })}
                >{index + 1}) {option}</button>)
            }
        </div>
    )
}
