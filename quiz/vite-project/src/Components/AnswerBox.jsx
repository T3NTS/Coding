import React from 'react'
import '../Styles/Question.css'

export default function AnswerBox(props) {
    const {answer, arrayNum, formData, handleChange, decodedString, finalRender, isToggled} = props
    let styles = {
        backgroundColor: isToggled(answer.id)  ? "#D6DBF5" : "white",
        color: isToggled(answer.id) ? "#293264" : "#4D5B9E",
        border: isToggled(answer.id) ? "none" : "1px solid #4D5B9E",
        width: adjustDivWidth(decodedString(answer.name))
    }

    if (finalRender) {
        if (isToggled(answer.id) === true) {
            styles = {
                ...styles,
                backgroundColor: answer.correct ? "#94D7A2" : "#F8BCBC",
                color: answer.correct ? "#293264" : "#293264",
                opacity: answer.correct ? 1 : 0.5
            }
        } else {
            styles = {
                ...styles,
                backgroundColor: answer.correct ? "#94D7A2" : "white",
                color: answer.correct ? "#293264" : "#293264",
                border: answer.correct ? "none" : "1px solid #4D5B9E",
                opacity: answer.correct ? 1 : 0.5
            }
        }
    }

    function adjustDivWidth(text) {
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.whiteSpace = 'nowrap';
        span.textContent = text;
        span.style.font = "1rem Inter"

        document.body.appendChild(span);
        const textWidth = span.offsetWidth;
        document.body.removeChild(span);
        if (textWidth > 90) {
            return `${textWidth}px`
        } else {
            return '90px'
        }
    }
    const value = answer.name
    return (
        <div>
            <input 
                type="radio"
                id={answer.id}
                name={`answer${arrayNum}`}
                onChange={handleChange}
                value={decodedString(answer.name)}
                checked={formData.name === value}
            />
            <label style={styles} htmlFor={answer.id} className='label'>
                {decodedString(answer.name)}
            </label>
        </div>
    )
}

