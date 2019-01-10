const initialState = {
    isAuthenticated: false,
    user: {},
    discussion: []
}

const USER_LOGGED_IN = 'USER_LOGGED_IN';
const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
const UPDATE_DISCUSSION_BOARD = 'UPDATE_DISCUSSION_BOARD';

export default function reducer(state = initialState, action) {

    switch(action.type) {

        case USER_LOGGED_IN:
            return {...state, isAuthenticated: true, user: action.payload}

        case USER_LOGGED_OUT:
            return {...state, isAuthenticated: false, user: {}}

        case UPDATE_DISCUSSION_BOARD:
            return {...state, discussion: action.payload}

        default:
            return state

    }

}

export function userLoggedIn(user) {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export function userLoggedOut() {
    return {
        type: USER_LOGGED_OUT
    }
}

export function updateDiscussionBoard(discussion) {
    return {
        type: UPDATE_DISCUSSION_BOARD,
        payload: discussion
    }
}