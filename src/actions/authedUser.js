export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOG_USER_OUT = 'LOG_USER_OUT';

export function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id,
    };
}

export function logOutUser() {
    return {
        type: LOG_USER_OUT,
    };
}
