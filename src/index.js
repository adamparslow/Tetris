import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameBoard from './features/gameBoard';
import {Provider} from 'react-redux';
import {store} from './config/store'

(() => {
    ReactDOM.render(
        <Provider store={store}>
            <GameBoard />
        </Provider>,
        document.getElementById('root')
    );

    // inputSetup();
})();

// function inputSetup() {
//     let keys = {}

//     document.onkeydown = (evt) => {
//         if (!keys[evt.key]) {
//             keys[evt.key] = true;
//             console.log(evt.key);
//         }
//     }

//     document.onkeyup = (evt) => {
//         if (keys[evt.key]) {
//             console.log(evt.key);
//         }
//         keys[evt.key] = false;
//     }
// }


