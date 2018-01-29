import {ADD_TASK, LOAD_TASK, UPDATE_LOCATION} from './actionTypes';

export const addTask = task => ({
    type: ADD_TASK,
    payload: task
});

export const loadTask = taskId => ({
    type: LOAD_TASK,
    payload: taskId
});

export const updateLocation = location => ({
    type: UPDATE_LOCATION,
    payload: location
});
