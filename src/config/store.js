import { createStore, combineReducers } from 'redux';
import gameReducer from '../features/gameBoard/reducer';

const rootReducer = combineReducers({
    game: gameReducer   
});

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    
);