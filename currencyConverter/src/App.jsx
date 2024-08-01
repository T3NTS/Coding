import React from 'react'
import Arrow from './components/Arrow.jsx'
import Xmark from './components/Xmark.jsx'
import Select from './components/Select.jsx'
import './App.css'

function App() {
  const [currencyData, setCurrencyData] = React.useState("")
  const [input, setInput] = React.useState("")
  const [inputData1, setInputData1] = React.useState({
    currency: 'EUR',
    amount: 1
  })
  const [keyLog1, setKeyLog1] = React.useState(0)
  const [keyLog2, setKeyLog2] = React.useState(0)
  const [inputData2, setInputData2] = React.useState({
    currency: 'USD',
    amount: 0
  })
  const [swap, setSwap] = React.useState(false)
  const [isArrowDown1, setIsArrowDown1] = React.useState(true)
  const [isArrowDown2, setIsArrowDown2] = React.useState(true)
  const [isHovered1, setIsHovered1] = React.useState(false)
  const [isHovered2, setIsHovered2] = React.useState(false)
  const [isClicked, setIsClicked] = React.useState(false)
  const [isOpen1, setIsOpen1] = React.useState(false)
  const [isOpen2, setIsOpen2] = React.useState(false)

  async function getScreen() {
    const jsonDataString = localStorage.getItem('currencyData')
    const jsonData = JSON.parse(jsonDataString)
    await new Promise((resolve) => {
      setCurrencyData(jsonData)
      resolve(jsonData)
    })
    getSelectArray(jsonData)
  }

  React.useEffect(() => {
    const storedTime = localStorage.getItem('time')
    console.log(storedTime)
    const timeNow = Date.now()
    console.log(timeNow)
    if (!localStorage.getItem('currencyData') || timeNow - 3600000 > storedTime) {
      localStorage.setItem('time', timeNow)
      console.log('fetched data')
      fetch('https://api.currencyapi.com/v3/latest?apikey=cur_live_e0MSzGBrNi17fgpNrMvAJL0RCKEy1ynVTPOsbDnk')
      .then((response) => {
      return response.json()
    }).then((data) => {
      const jsonData = JSON.stringify(data)
      localStorage.setItem('currencyData', jsonData)
      setCurrencyData(data)
      return data
    }).then((data) => {
      getSelectArray(data)
    }).then(() => {
      setKeyLog1(prevData => prevData + 1)
    })
    } else {
      getScreen().then(setKeyLog1(prevData => prevData + 1))
    }
  }, [])

  function getConvert() {
    console.log('converting')
    const data = currencyData.data
    if (!swap) {
      const inputCurrency = data[inputData1.currency].value
      const outputCurrency = data[inputData2.currency].value
      const convertedAmount = (outputCurrency/inputCurrency) * inputData1.amount
      const rounded = Math.round(convertedAmount * 100000) / 100000;
      setInputData2(prevData => ({
        ...prevData,
        amount: rounded
      }))
    } else if (swap) {
      const outputCurrency = data[inputData1.currency].value
      const inputCurrency = data[inputData2.currency].value
      const convertedAmount = (outputCurrency/inputCurrency) * inputData2.amount
      const rounded = Math.round(convertedAmount * 100000) / 100000;
      setInputData1(prevData => ({
        ...prevData,
        amount: rounded
      }))
    }
  }

  React.useEffect(() => {
    if (keyLog1 > 0) {
      getConvert()
    }
  }, [keyLog1])

  React.useEffect(() => {
    if (keyLog2 > 0) {
      getConvert()
    }
  }, [keyLog2])

  function getSelectArray(array) {
    let arr = []
    Object.entries(array.data).forEach(([key, value]) => {
      arr.push(value)
    })
    setInput(arr)
  }

  function handleChange(event) {
    const {value, name, id} = event.target
    if (id === '1' || id === '11') {
      setInputData1(prevData => ({
        ...prevData,
        [name]: value
      }))
      setSwap(false)
      setKeyLog1(prevData => prevData + 1)
    } else {
      setInputData2(prevData => ({
        ...prevData,
        [name]: value
      }))
      name === 'amount' ? setSwap(true) : ''
      setKeyLog2(prevData => prevData + 1)
    }
  }

  function doSwap() {
    const buffer = inputData1
    setInputData1(prevData => ({
      amount: prevData.amount,
      currency: inputData2.currency
    }))
    setInputData2(buffer)
    setKeyLog1(prev => prev + 1)
  }

  function changeCurrency(currency, index) {
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

  function changeArrow(id) {
    id === 1 ? setIsArrowDown1(prevData => !prevData) : setIsArrowDown2(prevData => !prevData)
    if (id === 1) {
      const selectElement = document.querySelector('.input-select')
      selectElement.focus()
      selectElement.click()
    }
    
  }

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
              <Select 
                inputData={inputData1.currency}
                handleChange={handleChange}
                className='input-select'
                id='1'
                options={options}
                handleOnMouseEnter={() => setIsHovered1(true)}
                handleOnMouseLeave={() => setIsHovered1(false)}
                handleOnFocus={() => setIsArrowDown1(prev => !prev)}
                handleOnBlur={() => setIsArrowDown1(prev => !prev)}
                //isOpen={isOpen1}
              />
              <div className='icon-container'>
                <Xmark 
                  isHovered={isHovered1}
                  handleOnMouseEnter={() => setIsHovered1(true)}
                  setInputData={() => setInputData1(prev => ({
                    amount: prev.amount,
                    currency: 'USD'
                  }))}
                />
                <Arrow 
                  handleOnMouseEnter={() => setIsHovered1(true)}
                  changeArrow={changeArrow} 
                  isArrowDown1={isArrowDown1}
                  id={1}
                  isClicked={isClicked}
                />
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
            onClick={doSwap}
          >
          </button>
          <div className='output-div'>
            <div className='select-container'>
              <Select 
                inputData={inputData2.currency}
                handleChange={handleChange}
                className='output-select'
                id='2'
                options={options}
                handleOnMouseEnter={() => setIsHovered2(true)}
                handleOnMouseLeave={() => setIsHovered2(false)}
                handleOnFocus={() => setIsArrowDown2(prev => !prev)}
                handleOnBlur={() => setIsArrowDown2(prev => !prev)}
                isOpen={isOpen2}
              />
              <div className='icon-container'>
                <Xmark 
                  isHovered={isHovered2} 
                  handleOnMouseEnter={() => setIsHovered2(true)}
                  setInputData={() => setInputData2(prev => ({
                    amount: prev.amount,
                    currency: 'USD'
                  }))
                }
                />
                <Arrow 
                  handleOnMouseEnter={() => setIsHovered2(true)}
                  changeArrow={changeArrow} 
                  isArrowDown2={isArrowDown2}
                  id={2}
                  isClicked={isClicked}
                />
              </div>
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
