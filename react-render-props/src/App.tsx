import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const Euro: React.FC<{amount: number}> = ({amount}) => <p>Euro: {amount * 0.86}</p>
const Pound: React.FC<{amount: number}> = ({amount}) => <p>Pound: {amount * 0.76}</p>


type OnIncrement = () => void
type OnDecrement = () => void

type AmountProps = {
  renderAmountOne: (amount: number) => React.ReactElement;
  renderAmountTwo: (amount: number) => React.ReactElement;
}

const Amount: React.FC<AmountProps> = ({renderAmountOne, renderAmountTwo}) => {
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

      {renderAmountTwo(amount)}

			<button type="button" onClick={onIncrement}>
				+
			</button>
			<button type="button" onClick={onDecrement}>
				-
			</button>

      {renderAmountOne(amount)}
		</div>
	)
}

const App: React.FC = () => {
	return (
		<Amount
			renderAmountOne={amount => (
				<div>
					<h2>My one Amount</h2>
					<Pound amount={amount} />
					<Euro amount={amount} />
				</div>
			)}
			renderAmountTwo={amount => (
				<div>
					<h2>My other Amount</h2>
					<Pound amount={amount} />
					<Euro amount={amount} />
				</div>
			)}
		/>
	)
}

export default App
