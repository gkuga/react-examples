import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const Euro: React.FC<{amount: number}> = ({amount}) => <p>Euro: {amount * 0.86}</p>
const Pound: React.FC<{amount: number}> = ({amount}) => <p>Pound: {amount * 0.76}</p>


type OnIncrement = () => void
type OnDecrement = () => void

type AmountProps = {
  children: (amount: any) => React.ReactElement;
}

const Amount: React.FC<AmountProps> = ({children}) => {
	const [amount, setAmount] = useState<number>(0)

  const onIncrement = () => {
    setAmount(amount + 1 )
  }

  const onDecrement = () => {
    setAmount(amount - 1 )
  }

	return (
		<div>
			<span>US Dollar: {amount} </span>

			<button type="button" onClick={onIncrement}>
				+
			</button>
			<button type="button" onClick={onDecrement}>
				-
			</button>
      {children(amount)}
		</div>
	)
}

const App: React.FC = () => {
	return (
		<div>
			<Amount>
				{amount => (
					<div>
						<Pound amount={amount} />
						<Euro amount={amount} />
					</div>
				)}
			</Amount>
		</div>
	)
}

export default App
