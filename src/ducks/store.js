import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import promiseMiddleware from 'redux-promise-middleware'
import {routerMiddleware} from 'react-router-redux'

const history = createHistory()

let middleware = [
    promiseMiddleware(),
    routerMiddleware(history),
    thunk
]

export default createStore(reducer, applyMiddleware(...middleware))
