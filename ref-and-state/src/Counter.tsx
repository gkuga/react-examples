import React, { useRef, useReducer, useState } from 'react'
import ReactDOM from 'react-dom'

let countGlobal = 0
console.log('global ', countGlobal)

export function Counter() {
  const [countReducer, dispatch] = useReducer(p => p + 1, 0)
  const [countState, setCountState] = useState(0)
  const countRef = useRef(0)
  let countInner = 0
  console.log('inner ', countGlobal, countInner, countRef.current, countState, countReducer)

  const increment = () => {
    countGlobal = countGlobal + 1
    countInner = countInner + 1
    countRef.current = countRef.current + 1
    setCountState(p => p + 1)
    dispatch()
    console.log('click increment ', countGlobal, countInner, countRef.current, countState, countReducer)
  }

  const incrementGlobal = () => {
    countGlobal = countGlobal + 1
    console.log(countGlobal)
  }

  const incrementInner = () => {
    countInner = countInner + 1
    console.log(countInner)
  }

  const incrementRef = () => {
    countRef.current = countRef.current + 1
    console.log(countRef.current)
  }

  const incrementState = () => {
    setCountState(p => p + 1)
    console.log(countState)
  }

  const incrementReducer = () => {
    dispatch()
    console.log(countReducer)
  }

  return (
    <>
      <button onClick={increment}>All</button>
      <button onClick={incrementGlobal}>global</button>
      <button onClick={incrementInner}>inner</button>
      <button onClick={incrementRef}>ref</button>
      <button onClick={incrementState}>state</button>
      <button onClick={incrementReducer}>reducer</button>
      <h3>global {countGlobal}</h3>
      <h3>inter {countInner}</h3>
      <h3>reference {countRef.current}</h3>
      <h3>state {countState}</h3>
      <h3>reducer {countReducer}</h3>
    </>
  )
}
