import { receiveUsers, addAnswerToUser, addQuestionToUser } from './users';
import {
    receiveQuestions,
    addQuestion,
    addAnswerToQuestion,
} from './questions';
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

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
    return (dispatch) => {
        return saveQuestion({ optionOneText, optionTwoText, author }).then(
            (question) => {
                dispatch(addQuestion(question));
                dispatch(addQuestionToUser(question));
            }
        );
    };
}

export function handleSaveQuestionAnswer(authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(addAnswerToUser(authedUser, qid, answer));
        dispatch(addAnswerToQuestion(authedUser, qid, answer));

        return saveQuestionAnswer({ authedUser, qid, answer }).catch((e) => {
            console.warn('Error in handleSaveQuestionAnswer:', e);
        });
    };
}
