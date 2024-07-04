import React from 'react'
import '../Styles/Question.css'
import { nanoid } from 'nanoid'


export default function Question(props) {
  const id = nanoid()
  console.log(props)
  const [formData, setFormData] = React.useState("")
  const [answer, setAnswer] = React.useState("")
  
  //setToggled()

  function toggle(id) {
   setQuestion(prevQuestion => {
    //return prevQ
   })
  }
  function handleChange(event) {
    console.log(event)
    const {name, value, type, checked, correct} = event.target
    const element = event.target
    console.log(element)
    toggle(element.value)
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }
    })
    const label = document.querySelector(`.label${element.id}`)
    label.classList.add('clicked')
    //console.log(formData)
    //console.log(event.target)
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
            id={id}
            name="answer"
            onChange={handleChange}
            value={props.answers[0]}
          />
          <label style={styles} htmlFor={id} className='label1'>{props.answers[0]}</label>
          <input 
            type="radio"
            id="2"
            name="answer"
            onChange={handleChange}
            value={props.answers[1]}
          />
          <label style={styles} htmlFor="2" className='label2'>{props.answers[1]}</label><input 
            type="radio"
            id="3"
            name="answer"
            onChange={handleChange}
            value={props.answers[2]}
          />
          <label style={styles} htmlFor="3" className='label3'>{props.answers[2]}</label><input 
            type="radio"
            id="4"
            name="answer"
            onChange={handleChange}
            value={props.answers[3]}
          />
          <label style={styles} htmlFor="4" className='label4'>{props.answers[3]}</label>
        </form>
      <hr className='line'></hr>
      </div>
    </div>
  )
}