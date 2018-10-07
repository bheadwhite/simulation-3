const SET_USERNAME =    'SET_USERNAME'
const SET_PASSWORD =    'SET_PASSWORD'
const SET_PIC =         'SET_PIC'
const RESET =           'RESET'

const initialState = {
    username: '',
    password: '',
    profilePic: '',
    userId: 0,
    myPosts: []
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case SET_USERNAME:
            return Object.assign({}, state, {username: action.payload})
        case SET_PASSWORD:
            return Object.assign({}, state, {password: action.payload})
        case SET_PIC: 
            return Object.assign({}, state, {profilePic: action.payload})
        case RESET: 
            return Object.assign({}, initialState)
        default:
            return state
    }
}

export function setUser(user){
    return {
        type: SET_USERNAME,
        payload: user
    }
}

export function setPassword(pass){
    return {
        type: SET_PASSWORD,
        payload: pass
    }
}

export function setProfile(pic){
    return {
        type: SET_PIC,
        payload: pic
    }
}

export function reset(){
    return {
        type: RESET
    }
}