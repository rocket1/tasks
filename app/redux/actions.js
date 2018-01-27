import {ADD_TASK, LOAD_TASK} from './actionTypes';

export const addTask = task => ({
    type: ADD_TASK,
    payload: task
});

export const loadTask = taskId => ({
    type: LOAD_TASK,
    payload: taskId
});
