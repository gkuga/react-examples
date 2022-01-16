import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const Euro: React.FC<{amount: number}> = ({amount}) => <p>Euro: {amount * 0.86}</p>
const Pound: React.FC<{amount: number}> = ({amount}) => <p>Pound: {amount * 0.76}</p>


type OnIncrement = () => void
type OnDecrement = () => void

type AmountProps = {
  amount: number
	onIncrement: OnIncrement
	onDecrement: OnDecrement
}

const Amount: React.FC<AmountProps> = ({ children, amount, onIncrement, onDecrement }) => {

	return (
		<div>
			<span>US Dollar: {amount} </span>

			<button type="button" onClick={onIncrement}>
				+
			</button>
			<button type="button" onClick={onDecrement}>
				-
			</button>
      {children}
		</div>
	)
}

const App: React.FC = () => {
	const [amount, setAmount] = useState<number>(0)

  const onIncrement = () => {
    setAmount(amount + 1 )
  }

  const onDecrement = () => {
    setAmount(amount - 1 )
  }


	return (
		<div>
			<Amount
				amount={amount}
				onIncrement={onIncrement}
				onDecrement={onDecrement}
			>
				<Euro amount={amount} />
				<Pound amount={amount} />
			</Amount>
		</div>
	)
}

export default App
