import defaultState from '../../default-state.json'
import {ADD_TASK, LOAD_INIT_REGION, LOAD_TASK} from './actionTypes';
import StepState from '../components/task/step-state';

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
const loadTaskReducer = (state, action) => ({...state, loadedTask: action.payload});

/**
 *
 * @param state
 * @param action
 * @returns {{initRegion}}
 */
const loadInitRegionReducer = (state, action) => ({...state, initRegion: action.payload});

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
        case LOAD_INIT_REGION:
            return loadInitRegionReducer(state, action);
        default:
            return state;
    }
};

export default rootReducer;
