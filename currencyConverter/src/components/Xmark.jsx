import React from 'react'
import xmark from '../assets/xmark-svgrepo-com.svg'
import '../App.css'

export default function Xmark(props) {
    console.log(props.isHovered)
    const styles = {
        display: props.isHovered ? 'block' : 'none' 
    }
    return (
        <button
            onMouseEnter={props.handleOnMouseEnter}
            onClick={props.setInputData} 
            style={styles} 
            className='xmark'
        >
            <img src={xmark}></img>
        </button>
    )
}