import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

type OnIncrement = () => void
type OnDecrement = () => void

type CurrencyComponentType = React.FC<{amount: number}>

const withAmount = (currencyComponents: Array<CurrencyComponentType>) => 
	() => {
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

				{currencyComponents.map((CurrencyComponent: CurrencyComponentType) => (
					<CurrencyComponent amount={amount} />
				))}
			</div>
		)
	}

const Euro: CurrencyComponentType = ({amount}) => <p>Euro: {amount * 0.86}</p>
const Pound: CurrencyComponentType = ({amount}) => <p>Pound: {amount * 0.76}</p>
const CurrenciesWithAmount = withAmount([Euro, Pound])
const App = () => <CurrenciesWithAmount />

export default App
