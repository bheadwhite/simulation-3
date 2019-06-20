import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import store, { UPDATE_POSTS, UPDATE_USER } from "./../../ducks/store"
import Search from "../Search/Search"
import axios from "axios"

import "./dashboard.css"

class Dashboard extends Component {
	state = {
		myPosts: false,
		searchQuery: "",
		posts: []
	}
	componentDidMount() {
		if (!this.props.user.username) {
			axios.get("/api/auth/me").then(({ data }) => {
				data
					? store.dispatch({
							type: UPDATE_USER,
							payload: data
					  })
					: this.props.history.push("/")
			})
		}
		axios.get("/api/posts").then(({ data }) => {
			store.dispatch({
				type: UPDATE_POSTS,
				payload: data
			})
		})
	}
	componentDidUpdate(prevProps, prevState){
		const query = prevState.searchQuery !== this.state.searchQuery
		const myPosts = prevState.myPosts !== this.state.myPosts
		if(query || myPosts){
			this.updatePosts()
		}
	}

	updatePosts = () => {
		let posts = this.props.posts.filter(post => post.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
		if (this.state.myPosts){
			posts = posts.filter(post => post.id === this.props.user.id )
		}
		this.setState({
			posts
		})
	}
	reset = e => {
		e.preventDefault()
		this.setState({
			myPosts: true,
			searchQuery: ""
		})
	}

	getPosts = () => {
		const { myPosts, searchQuery } = this.state
		axios
			.get(`/api/posts?userPosts=${myPosts}&search=${searchQuery}`)
			.then(resp => {
				this.setState({ posts: resp.data, searchQuery: "" })
				this.props.setPosts(resp.data)
			})
			.catch(e => console.log(e))
	}
	handleChange = e => {
		if (e.target.name === "myPosts") {
			this.setState({
				[e.target.name]: !this.state.myPosts
			})
		} else {
			this.setState({
				[e.target.name]: e.target.value
			})
		}
	}
	render() {
		console.log(this.state.posts)
		const {searchQuery, myPosts} = this.state
		const posts = searchQuery || myPosts ? this.state.posts : null || this.props.posts
		return (
			<div className='container'>
				<Search change={this.handleChange} searchQuery={this.state.searchQuery} myPosts={this.state.myPosts} reset={this.reset} handleSubmit={this.handleSubmit}/>
				<div className='posts'>
					{posts &&
						posts.map(({ pid, title, username, pic }) => {
							return (
								<Link key={pid} to={`/post/${pid}`}>
									<div className='postItem'>
										<h2>{title}</h2>
										<div>
											<p>by {username}</p>
											<img src={pic} alt={username} />
										</div>
									</div>
								</Link>
							)
						})}
				</div>
			</div>
		)
	}
}

export default connect(state => state)(Dashboard)
