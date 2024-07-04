import React from 'react'
import '../Styles/Question.css'

export default function Question(props) {
  console.log(props)

  const [formData, setFormData] = React.useState("")
  const [questions, setQuestions] = React.useState(props)

  function handleChange(event) {
    const {name, value, type, checked, correct} = event.target
    const element = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }
    })
    const label = document.querySelector(`.label${element.id}`)
    label.classList.add('clicked')
    console.log(formData)
    console.log(event.target)
  }

  function toggle(id) {
    /*setQuestions(oldQuestions => {
      return oldQuestions.map((question) => {
        return question.question === id ? {}
      })
    })*/
  }

  const styles = {
    backgroundColor: props.clicked ? "#D6DBF5" : "white",
    color: props.clicked ? "#293264" : "#4D5B9E"
  }

  return (
    <div >
      <h2 className='question-title'>{props.question}</h2>
      <div>
        <form className='form--question'>
          <input 
            type="radio"
            id="1"
            name="answer"
            onChange={handleChange}
            correct={props.correct_answer}
            value={props.answers[0]}
          />
          <label style={styles} htmlFor="1" className='label1'>{props.answers[0]}</label>
          <input 
            type="radio"
            id="2"
            name="answer"
            onChange={handleChange}
            value={props.answers[1]}
          />
          <label htmlFor="2" className='label2'>{props.answers[1]}</label><input 
            type="radio"
            id="3"
            name="answer"
            onChange={handleChange}
            value={props.answers[2]}
          />
          <label htmlFor="3" className='label3'>{props.answers[2]}</label><input 
            type="radio"
            id="4"
            name="answer"
            onChange={handleChange}
            value={props.answers[3]}
          />
          <label htmlFor="4" className='label4'>{props.answers[3]}</label>
        </form>
      <hr className='line'></hr>
      </div>
    </div>
  )
}