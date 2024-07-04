import React from 'react'
import AnswerBox from './AnswerBox'

export default function Question(props) {
    //const [answerBoxCount, setAnswerboxCount] = React.useState(0)
    //console.log("rendering question")

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
          />
        )
      })
      
      return (
        <div>
          <h2 className='question-title'>{props.question}</h2>
          <form className='form--question'>
            {allAnswers}
          </form>
          <hr className='line'></hr>
        </div>
      )
}