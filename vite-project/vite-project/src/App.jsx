import React from 'react'
import './Styles/Start.css'
import Question from './Components/Question.jsx'

export default function App() {
  const [allData, setAllData] = React.useState([])
  const [screen, setScreen] = React.useState("start")
  
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
      const result = await response.json();
      console.log(result.results)
      const finalData = await result.results.map(resultItem => ({
        ...resultItem,
        answers: [resultItem.correct_answer, ...resultItem.incorrect_answers]
      }))
      setAllData(finalData);
    };

    fetchData();
  }, []);

  function changeScreen() {
    setScreen(oldScreen => oldScreen === "start" ? "questions" : "start")
  }

  function chgData() {
    setAllData(prevData => prevData.map(dataElement => ({
        ...dataElement,
        answers: [dataElement.correct_answer, dataElement.incorrect_answers]
      })))
  }

  if (screen === "start") {
    return (
      <div className='start-div'>
        <h1 className='title'>Quizzical</h1>
        <h5 className='description'>Some description if needed</h5>
        <button className='start-button' onClick={changeScreen}>Start quiz</button>
      </div>
    )
  } else if (screen === "questions") {
    //console.log(allData)
    //chgData()
    const questions = allData.map(element => {
      return (
        <Question 
          key={element.question}
          {...element}

        />
      )
    })
    return (
      <div>
        {questions}
        <button className='check-answers-button' >
          Check Answers
        </button>
      </div>
    )
    //console.log(allData)
    //return <Question props={allData}/>
  }
}
