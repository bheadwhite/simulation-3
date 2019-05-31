import axios from 'axios'

const SET_USER =        'SET_USER'
const SET_POSTS =       'SET_POSTS'
const SET_POST =        'SET_POST'
const RESET =           'RESET'
const _FULFILLED =      '_FULFILLED'
// ,_PENDING       = '_PENDING'
// _REJECTED      = '_REJECTED';

// const initialState = {
//     user: {},
//     myPosts: [],
//     myPost: {}
// }

// export default function reducer(state=initialState, action){
//     switch(action.type){
//         case SET_USER:
//             return Object.assign({}, state, { user: action.payload })
//         case SET_POSTS: 
//             return Object.assign({}, state, {myPosts: action.payload})
//         case SET_POST + _FULFILLED: 
//             return Object.assign({}, state, {myPost: action.payload.data[0]})
//         case RESET: 
//             return Object.assign({}, initialState)
//         default:
//             return state
//     }
// }

// export function setUser(user){
//     return {
//         type: SET_USER,
//         payload: user
//     }
// }

// export function setPosts(data){
//     return {
//         type: SET_POSTS,
//         payload: data
//     }
// }

// export function setPost(id){
//     const post = axios.get(`/api/post/${id}`)
//     return {
//         type: SET_POST,
//         payload: post
//     }
// }

// export function reset(){
//     return {
//         type: RESET
//     }
// }