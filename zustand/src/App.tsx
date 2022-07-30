import React from 'react';
import logo from './logo.svg';
import './App.css';

import create from 'zustand';

interface State {
  count: number;
  increment: () => void;
}

const useStore = create<State>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

function App() {
  const { count, increment } = useStore();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        {count} <button onClick={increment}>+1</button>
      </div>
    </div>
  );
}

export default App;
