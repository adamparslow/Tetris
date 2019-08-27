import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { GameBoard } from './GameBoard';

(() => {
    const FRAMES_PER_SEC = 30;

    ReactDOM.render(<GameBoard />, document.getElementById('root'));

    window.setInterval(() => {
        console.log("How many times does this run?")
    }, 1000/FRAMES_PER_SEC);

    inputSetup();
})();

function inputSetup() {
    let keys = {}

    document.onkeydown = (evt) => {
        if (keys[evt.key] == null || keys[evt.key] == false) {
            keys[evt.key] = true;
            console.log(evt.key);
        }
    }

    document.onkeyup = (evt) => {
        keys[evt.key] = false;
        console.log(evt.key);
    }
}


