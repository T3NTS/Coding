import React from 'react'
import AnswerBox from './AnswerBox'

export default function Question(props) {
    const allAnswers = props.answers.map(answer => {
        return (
          <AnswerBox 
            key={answer.name}
            answer={answer}
            handleChange={props.handleChange}
            arrayNum={props.id}
            formData={props.formData}
            isToggled={props.isToggled}
            decodedString={props.decodedString}
            finalRender={props.finalRender}
          />
        )
      })
      
      return (
        <div>
          <h2 className='question-title'>{props.decodedString(props.question)}</h2>
          <form className='form--question'>
            {allAnswers}
          </form>
          <hr className='line'></hr>
        </div>
      )
}