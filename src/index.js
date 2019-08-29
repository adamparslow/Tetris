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
})();


