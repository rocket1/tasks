import defaultState from '../../default-state.json'
import {ADD_TASK} from './actionTypes';

const rootReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state, tasks: [...state.tasks, action.payload]
            };
        default:
            return state;
    }
};

export default rootReducer;
