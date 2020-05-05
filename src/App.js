import React from 'react';
import GameBoard from './components/GameBoard';
import './App.css';

function App() {
    return (
        <div className="App">
            <h2>Connect Four!</h2>
            <GameBoard />
        </div>
    );
}

export default App;
