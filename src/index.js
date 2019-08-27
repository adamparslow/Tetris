import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameBoard from './GameBoard';
import { movePieceDown } from './actions';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { pieceReducer } from './pieceReducer';

(() => {
    const FRAMES_PER_SEC = 3;

    const store = createStore(pieceReducer);
    store.subscribe(() => console.log(store.getState()));

    ReactDOM.render(
        <Provider store={store}>
            <GameBoard width="10" height="20"/>
        </Provider>,
        document.getElementById('root'));

    window.setInterval(() => {
        store.dispatch(movePieceDown());
    }, 1000/FRAMES_PER_SEC);

    inputSetup();
})();

function inputSetup() {
    let keys = {}

    document.onkeydown = (evt) => {
        if (!keys[evt.key]) {
            keys[evt.key] = true;
            console.log(evt.key);
        }
    }

    document.onkeyup = (evt) => {
        if (keys[evt.key]) {
            console.log(evt.key);
        }
        keys[evt.key] = false;
    }
}


