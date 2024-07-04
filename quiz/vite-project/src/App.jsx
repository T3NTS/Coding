import React from 'react'
import './Styles/Start.css'
import Question from './Components/Question.jsx'
import { nanoid } from 'nanoid'
import he from 'he'

export default function App() {
  const [allData, setAllData] = React.useState([])
  const [screen, setScreen] = React.useState('home')
  const [game, setGame] = React.useState(false)
  const [formData, setFormData] = React.useState({
    answer0: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: ""
  })
  const [finalRender, setFinalRender] = React.useState(false)
  const [resultsDiv, setResultsDiv] = React.useState("")


  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=23&type=multiple')
      .then(res => res.json())
      .then(data => setAllData(data.results.map((item, index) => ({
        ...item,
        id: index,
        answers: getAnswers(item)
      }))))
      .then(setResultsDiv(
        <div className='results'>
          <button onClick={checkAnswers} className='check-answers-button'>Check Answers</button>
        </div>
      ))
  }, [game]);

  React.useEffect(() => {
    setResultsDiv(
      <div className='results'>
        <button onClick={checkAnswers} className='check-answers-button'>Check Answers</button>
      </div>
    )
  }, [formData])
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getAnswers(array) {
    const oneAnswers = []
    const shuffledArray = shuffleArray([array.correct_answer, ...array.incorrect_answers])
    shuffledArray.forEach(answer => {
      oneAnswers.push({
        name: answer,
        id: nanoid(),
        correct: array.correct_answer === answer ? true : false
      })
    })
    return oneAnswers
  }

  function decodedString(string) {
    return he.decode(string)
  }
/*
  function toggle(index, name) {
    setAllData(prevData => {
      return prevData.map(question => {
        if ((question.id) === index) {
          return ({
            ...question,
            answers: question.answers.map(answer => {
              if (answer.name === name) {
                console.log(answer)
                return ({
                  ...answer,
                  toggled: !answer.toggled
                })
              } else {
                return answer
              }
            })
          })
        } else {
          return question
        }
      })
    })
  }
    */

  function isToggled(item) {
    let result = false
    Object.entries(formData).forEach(([key, value]) => {
      //console.log(value, item)
        if (value == item) {
            result = true
        }
    })
    return result
  }

  function handleChange(event) {
    const {name, value, type, checked, id} = event.target
    console.log(allData)
    setFormData(prevData => ({
      ...prevData,
      [name]: id
    }))
  }

  function getCorrectCount() {
    let count = 0
    allData.forEach(question => {
      question.answers.forEach(answer => {
        isToggled(answer.id) && answer.correct ? count++ : 'wrong answer'
      })
    })
    return count
  }

  function clearGame() {
    setResultsDiv(
      <div className='results'>
        <button onClick={checkAnswers} className='check-answers-button'>Check Answers</button>
      </div>
    )
    setGame(prevState => !prevState)
    setScreen('home')
    setFinalRender(false)
  }

  function checkAnswers() {
    setFinalRender(true)
    const correctCount = getCorrectCount()
    setAllData(prevData => {
      return prevData.map(question => {
        return ({
          ...question,
          answers: question.answers.map(answer => {
            return ({
              ...answer,
              final: true
            })
          })
        })
      })
    })
    setResultsDiv(
      <div className='results'>
        <h2 className='score-text'>{`You scored ${correctCount}/5`}</h2>
        <button onClick={clearGame} className='check-answers-button'>Play Again</button>
      </div>
    )
  }

  function Home() {
    return (
      <div className='start-div'>
        <h1 className='title'>Quizzical</h1>
        <h5 className='description'>Some description if needed</h5>
        <button className='start-button' onClick={() => setScreen('questions')}>Start quiz</button>
      </div>
    )
  }

  function Questions() {
    const questions = allData.map(item => {
        return (
          <Question 
            key={item.question}
            {...item}
            handleChange={handleChange}
            formData={formData}
            isToggled={isToggled}
            decodedString={decodedString}
            finalRender={finalRender}
          />
          )
    })
    return (
      <main>
        {questions}
        {resultsDiv}
      </main>
    )
  }
  

  function renderScreen() {
    if (screen === 'home') {
      return <Home />
    } else if (screen === 'questions') {
      return (
        <Questions />
      )
    }
  }

  return (
    <div>
      {renderScreen()}
    </div>
  )
}
