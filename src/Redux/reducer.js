const initialState = {
    isAuthenticated: false,
    user: {},
    discussion: [],
    allUsers: [],
    user: {},
    friends: [],
    viewedProfile: {}
}

const USER_LOGGED_IN = 'USER_LOGGED_IN';
const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
const UPDATE_DISCUSSION_BOARD = 'UPDATE_DISCUSSION_BOARD';
const SET_FRIENDS = 'SET_FRIENDS';
const DISPLAY_USERS = 'DISPLAY_USERS';
const VIEW_PROFILE = 'VIEW_PROFILE';


export default function reducer(state = initialState, action) {

    switch(action.type) {

        case USER_LOGGED_IN:
            return {...state, isAuthenticated: true, user: action.payload}

        case USER_LOGGED_OUT:
            return {...state, isAuthenticated: false, user: {}}
        
        case SET_FRIENDS:
            return {...state, friends: action.payload}

        case DISPLAY_USERS:
            return {...state, allUsers: action.payload}

        case VIEW_PROFILE:
            return {...state, viewedProfile: action.payload}
        

        case UPDATE_DISCUSSION_BOARD:
            return {...state, discussion: action.payload}

        default:
            return state;

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

export function setFriends(friends) {
    return {
        type: SET_FRIENDS, 
        payload: friends
    }
}

export function displayUsers (allUsers) {
    return {
        type: DISPLAY_USERS, 
        payload: allUsers
    }
}

export function viewProfile(user) {
    return {
        type: VIEW_PROFILE,
        payload: user
    }
}