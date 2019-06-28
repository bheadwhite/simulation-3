import React, { Component } from "react"
import "./App.css"
import { Route, withRouter } from "react-router-dom"
import Nav from "./component/Nav/Nav"
import axios from "axios"
import store, { UPDATE_USER, UPDATE_POSTS } from "./ducks/store"
import routes from "./routes"
import { connect } from "react-redux"

class App extends Component {
	componentDidMount() {
		axios.get("/api/auth/me").then(res => {
			//handle processing data or route to home
			if (res.data) {
				//handle user/posts data retreival
				if (!this.props.posts.length > 0) {
					axios.get("/api/posts").then(({ data }) => {
						store.dispatch({
							type: UPDATE_POSTS,
							payload: data
						})
					})
				}
				store.dispatch({
					type: UPDATE_USER,
					payload: res.data
				})
			} else {
				this.props.history.push("/")
			}
		})
	}
	render() {
		return (
			<div className='App'>
					<Route path='/' component={Nav} />
					{routes}
			</div>
		)
	}
}
export default withRouter(connect(state => state)(App))
