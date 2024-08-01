import React from 'react'
import dataLong from './data.jsx'
import './App.css'

function App() {
  const [currencyData, setCurrencyData] = React.useState(dataLong)
  const [input, setInput] = React.useState("")
  const [inputData1, setInputData1] = React.useState({
    currency: 'EUR',
    amount: 0
  })
  const [keyLog1, setKeyLog1] = React.useState(0)
  const [keyLog2, setKeyLog2] = React.useState(0)
  const [inputData2, setInputData2] = React.useState({
    currency: 'USD',
    amount: 0
  })
  React.useEffect(() => {
      setInput(() => getSelectArray())
  }, [])

  function getConvert(id) {
    const data = currencyData.data
    console.log(inputData1, inputData2)
    console.log(data[inputData1.currency].value)
    if (id === 1) {
      const inputCurrency = data[inputData1.currency].value
      const outputCurrency = data[inputData2.currency].value
      const convertedAmount = (outputCurrency/inputCurrency) * inputData1.amount
      const rounded = Math.round(convertedAmount * 100000) / 100000;
      console.log(rounded)
      setInputData2(prevData => ({
        ...prevData,
        amount: rounded
      }))
    } else if (id === 2) {
      const outputCurrency = data[inputData1.currency].value
      const inputCurrency = data[inputData2.currency].value
      const convertedAmount = (outputCurrency/inputCurrency) * inputData2.amount
      const rounded = Math.round(convertedAmount * 100000) / 100000;
      console.log(rounded)
      setInputData1(prevData => ({
        ...prevData,
        amount: rounded
      }))
    }
  }

  React.useEffect(() => {
    console.log(inputData1.amount, inputData2.amount)
    getConvert(1)
  }, [keyLog1])

  React.useEffect(() => {
    getConvert(2)
  }, [keyLog2])

  function getSelectArray() {
    let arr = []
    Object.entries(currencyData.data).forEach(([key, value]) => {
      arr.push(value)
    })
    return arr
  }

  function handleChange(event) {
    console.log(currencyData)
    const {value, name, id} = event.target
    if (id === '1' || id === '11') {
      setInputData1(prevData => ({
        ...prevData,
        [name]: value
      }))
      setKeyLog1(prevData => prevData + 1)
    } else {
      setInputData2(prevData => ({
        ...prevData,
        [name]: value
      }))
      setKeyLog2(prevData => prevData + 1)
    }
    console.log(keyLog1, keyLog2)
  }

  function swap() {
    const buffer = inputData1
    setInputData1(prevData => ({
      ...prevData,
      currency: inputData2.currency
    }))
    //setKeyLog1(prevData => prevData + 1)
    setInputData2(prevData => ({
      ...prevData,
      currency: buffer.currency
    }))
    //setKeyLog2(prevData => prevData + 1)
  }

  function changeCurrency(currency, index) {
    console.log(currency)
    if (index === 1) {
      setInputData1(prevData => ({
        ...prevData,
        currency: currency
      }))
      setKeyLog1(prevData => prevData + 1)
    } else {
      setInputData2(prevData => ({
        ...prevData,
        currency: currency
      }))
      setKeyLog2(prevData => prevData + 1)
    }
  }
function changeArrow() {
  const arrow = document.querySelector('.arrow-down')
  console.log(arrow)
  arrow.style.backgroundImage = "url(assets/chevron-up-svgrepo-com.svg)"
}

  console.log(inputData1)
  if (input !== "") {
    const options = input.map((country) => {
      return (
        <option value={country.code}>
          {country.code}
        </option>
      )
    })
    return (
      <div className='centered'>
      <div className='main-div'>
        <div className='input-div'>
          <div className='select-container'>
            <select 
              className='input-select'
              id='1'
              name='currency'
              value={inputData1.currency}
              onChange={handleChange}
            >
              {options}
            </select>
            <div className='icon-container'>
              <button className='arrow-down' onClick={() => changeArrow()}></button>
            </div>
          </div>
          <input 
            className='input-input'
            name='amount'
            id='1'
            onChange={handleChange}
            value={inputData1.amount}
          />
          <div className='container1'>
            <button className='button' onClick={() => changeCurrency('EUR', 1)}>EUR</button>
            <button className='button' onClick={() => changeCurrency('BTC', 1)}>BTC</button>
            <button className='button' onClick={() => changeCurrency('USD', 1)}>USD</button>
            <button className='button' onClick={() => changeCurrency('GBP', 1)}>GBP</button>
          </div>
        </div>
        <button 
          className='swap-button'
          onClick={swap}
        >
        </button>
        <div className='output-div'>
          <div className='select-container'>
            <select 
              className='output-select'
              id='2'
              name='currency'
              value={inputData2.currency}
              onChange={handleChange}
            >
              {options}
            </select>
          </div>
          <input 
            className='output-input'
            name='amount'
            id='22'
            onChange={handleChange}
            value={inputData2.amount}
          />
          <div className='container2'>
            <button className='button' onClick={() => changeCurrency('USD', 2)}>USD</button>
            <button className='button' onClick={() => changeCurrency('ETH', 2)}>ETH</button>
            <button className='button' onClick={() => changeCurrency('EUR', 2)}>EUR</button>
            <button className='button' onClick={() => changeCurrency('PLN', 2)}>PLN</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default App
