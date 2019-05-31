import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import promiseMiddleware from 'redux-promise-middleware'
import { routerMiddleware } from 'react-router-redux'



export const UPDATE_USER =     'UPDATE_USER'
export const UPDATE_POSTS =    'UPDATE_POSTS'
export const UPDATE_POST =     'UPDATE_POST'
export const RESET =           'RESET'
export const _FULFILLED =      '_FULFILLED'
// ,_PENDING =                 '_PENDING'
// _REJECTED =                 '_REJECTED';

const history = createHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let middleware = [
    promiseMiddleware(),
    routerMiddleware(history),
    thunk
]

const initialState = {
  user: {},
  posts: [],
  myPost: {}
}

function reducer( state = initialState, action ){
  const { type, payload } = action
  switch( type ){
      case UPDATE_USER:
          return { ...state, user: payload }
      case UPDATE_POSTS: 
          return { ...state, posts: payload }
      case UPDATE_POST + _FULFILLED: 
          return { ...state, myPost: payload }
      case RESET: 
          return { initialState }
      default:
          return state
  }
}

export default createStore(reducer, composeEnhancers(applyMiddleware(...middleware)))
