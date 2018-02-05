import {ADD_TASK, LOAD_INIT_REGION, LOAD_TASK, SAVE_TASK} from './actionTypes';

export const addTask = task => ({
    type: ADD_TASK,
    payload: task
});

export const loadTask = task => ({
    type: LOAD_TASK,
    payload: task
});

export const saveTask = task => ({
    type: SAVE_TASK,
    payload: task
});

export const loadInitRegion = region => ({
    type: LOAD_INIT_REGION,
    payload: region
});
