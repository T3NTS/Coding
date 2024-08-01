import React from 'react'
import '../App.css'
import imgUp from '../assets/chevron-up-svgrepo-com.svg'
import imgDown from '../assets/chevron-down-svgrepo-com.svg'

export default function Arrow(props) {
    function Image() {
        if (props.id === 1) {
            return (
                <img src={props.isArrowDown1 ? imgDown : imgUp}></img>
            )
        } else {
            return (
                <img src={props.isArrowDown2 ? imgDown : imgUp}></img>
            )
        }
    }

    return (
        <button 
            onMouseEnter={props.handleOnMouseEnter} 
            className='arrow' 
            onClick={() => props.changeArrow(props.id)}
        >
            <Image /> 
        </button> 
    )
}