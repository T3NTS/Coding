import React from 'react'
import '../App.css'

export default function Select(props) {
    React.useEffect(() => {
        const handleCustomEvent = () => {
          //console.log('Element clicked!');
        };
    
        // Adding event listener after component has mounted
        document.addEventListener('mouseover', handleCustomEvent);
    
        // Cleanup function to remove event listener when component unmounts
        return () => {
          document.removeEventListener('mouseover', handleCustomEvent);
        };
        
      }, []); 
      return (
          <select 
            className={props.className}
            id={props.id}
            name='currency'
            value={props.inputData}
            onChange={props.handleChange}
            onMouseOver={props.handleOnMouseEnter}
            onMouseOut={props.handleOnMouseLeave}
            onFocus={props.handleOnFocus}
            onBlur={props.handleOnBlur}
          >
          {props.options}
          </select>

      );  
}