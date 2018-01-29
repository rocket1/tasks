import defaultState from '../../default-state.json'
import {ADD_TASK, LOAD_TASK, UPDATE_LOCATION} from './actionTypes';

/**
 *
 * @param state
 * @param action
 * @returns {{tasks: [null,null]}}
 */
const addTaskReducer = (state, action) => ({...state, tasks: [...state.tasks, action.payload]});

/**
 *
 * @param state
 * @param action
 * @returns {*}
 */
const loadTaskReducer = (state, action) => {
    for (let i = 0, len = state.tasks.length; i < len; ++i) {
        if (state.tasks[i].id === action.payload) {
            return {...state, loadedTask: state.tasks[i]}
        }
    }
    return state;
};

/**
 *
 * @param state
 * @param action
 * @returns {{tasks: (null|null)[]}}
 */
const rootReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return addTaskReducer(state, action);
        case LOAD_TASK:
            return loadTaskReducer(state, action);
        default:
            return state;
    }
};

export default rootReducer;
