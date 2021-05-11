import { receiveUsers } from './users';
import {
    getUsers,
    getQuestions,
    saveQuestion,
    saveQuestionAnswer,
} from '../utils/api';

export function getAllUsers() {
    return (dispatch) => {
        return getUsers().then((users) => {
            dispatch(receiveUsers(users));
        });
    };
}
