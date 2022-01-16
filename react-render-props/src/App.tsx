import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const Amount: React.FC = (props) => {
	const [amount, setAmount] = useState<number>(0)

  const onIncrement = () => {
    setAmount(amount + 1 )
  }

  const onDecrement = () => {
    setAmount(amount - 1 )
  }

	const Euro: React.FC<{amount: number}> = ({amount}) => <p>Euro: {amount * 0.86}</p>
	const Pound: React.FC<{amount: number}> = ({amount}) => <p>Pound: {amount * 0.76}</p>

	return (
		<div>
			<span>US Dollar: {amount} </span>

			<button type="button" onClick={onIncrement}>
				+
			</button>
			<button type="button" onClick={onDecrement}>
				-
			</button>
			<Euro amount={amount} />
			<Pound amount={amount} />
		</div>
	)
}

const App = () => <Amount />

export default App
