const initialState = {
    isAuthenticated: false,
    user: {},
    discussion: [],
    allUsers: [],
    friends: [],
    viewedProfile: {},
    to: '',
    from: '',
    destinationState: '',
    destinationCity: '',
    originState: '',
    originCity: '', 
    tripMembers: []
}

const USER_LOGGED_IN = 'USER_LOGGED_IN';
const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
const UPDATE_DISCUSSION_BOARD = 'UPDATE_DISCUSSION_BOARD';
const SET_FRIENDS = 'SET_FRIENDS';
const DISPLAY_USERS = 'DISPLAY_USERS';
const VIEW_PROFILE = 'VIEW_PROFILE';
const SET_USER = 'SET_USER';
const SET_DATES = 'SET_DATES';
const HANDLE_DESTINATION_CHANGE = 'HANDLE_DESTINATION_CHANGE';
const HANDLE_CITY_CHANGE = 'HANDLE_CITY_CHANGE';
const CLEAR_TRIP = 'CLEAR_TRIP';
const SET_ORIGIN_CITY = 'SET_ORIGIN_CITY';
const SET_ORIGIN_STATE = 'SET_ORIGIN_STATE';
const SET_MEMBERS = 'SET_MEMBERS';
export let types = {SET_FRIENDS, SET_ORIGIN_CITY, SET_MEMBERS, DISPLAY_USERS, UPDATE_DISCUSSION_BOARD}


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
        
        case SET_USER:
            return {...state, user: action.payload}
        
        case UPDATE_DISCUSSION_BOARD:
            return {...state, discussion: action.payload}

        case SET_DATES:
            return {...state, from: action.payload.from, to: action.payload.to}

        case HANDLE_DESTINATION_CHANGE:
            return {...state, destinationState: action.payload}

        case HANDLE_CITY_CHANGE:
            return {...state, destinationCity: action.payload}

        case CLEAR_TRIP:
            return {...state, to: '', from: '', destinationCity: '', destinationState: ''}

        case SET_ORIGIN_CITY:
            return {...state, originCity: action.payload}

        case SET_ORIGIN_STATE:
            return {...state, originState: action.payload}
        
        case SET_MEMBERS:
            return {...state, tripMembers: action.payload}

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
export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function setDates(dates) {
    return {
        type: SET_DATES,
        payload: dates
    }
}

export function handleDestinationChange(destination) {
    return {
        type: HANDLE_DESTINATION_CHANGE,
        payload: destination
    }
}

export function handleCityChange(city) {
    return {
        type: HANDLE_CITY_CHANGE,
        payload: city
    }
}

export function clearTrip() {
    return {
        type: CLEAR_TRIP
    }
}

export function setOriginState(origin) {
    return {
        type: SET_ORIGIN_STATE,
        payload: origin
    }
}

export function setOriginCity(city) {
    return {
        type: SET_ORIGIN_CITY,
        payload: city
    }
}
export function setMembers(member) {
    return {
        type: SET_MEMBERS,
        payload: member
    }
}
