import axios from 'axios'

const SET_USERNAME =    'SET_USERNAME'
const SET_PASSWORD =    'SET_PASSWORD'
const SET_PROFILE =     'SET_PROFILE'
const SET_POSTS =       'SET_POSTS'
const SET_POST =        'SET_POST'
const RESET =           'RESET'
const _FULFILLED =      '_FULFILLED'
// ,_PENDING       = '_PENDING'
// _REJECTED      = '_REJECTED';

const initialState = {
    username: '',
    password: '',
    profilePic: '',
    userId: 0,
    myPosts: [],
    myPost: {}
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case SET_USERNAME:
            return Object.assign({}, state, {username: action.payload})
        case SET_PASSWORD:
            return Object.assign({}, state, {password: action.payload})
        case SET_PROFILE: 
            return Object.assign({}, state, {profilePic: action.payload.pic, userId: action.payload.id})
        case SET_POSTS: 
            return Object.assign({}, state, {myPosts: action.payload})
        case SET_POST + _FULFILLED: 
            return Object.assign({}, state, {myPost: action.payload.data[0]})
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

export function setProfile(data){
    return {
        type: SET_PROFILE,
        payload: data
    }
}

export function setPosts(data){
    return {
        type: SET_POSTS,
        payload: data
    }
}

export function setPost(id){
    const post = axios.get(`/api/post/${id}`)
    return {
        type: SET_POST,
        payload: post
    }
}

export function reset(){
    return {
        type: RESET
    }
}