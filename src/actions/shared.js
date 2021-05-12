import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import {
    getUsers,
    getQuestions,
    saveQuestion,
    saveQuestionAnswer,
    getInitialData,
} from '../utils/api';

export function getAllUsers() {
    return (dispatch) => {
        return getUsers().then((users) => {
            dispatch(receiveUsers(users));
        });
    };
}

export function getAllQuestions() {
    return (dispatch) => {
        return getQuestions().then((questions) => {
            dispatch(receiveQuestions(questions));
        });
    };
}

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData().then(({ users, questions }) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
        });
    };
}
