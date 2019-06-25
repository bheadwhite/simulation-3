import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
// import store, { UPDATE_POSTS } from "./../../ducks/store"
import Search from "../Search/Search"
import axios from "axios"

import "./dashboard.css"

class Dashboard extends Component {
	state = {
		myPosts: false,
		searchQuery: "",
		posts: []
	}
	componentDidUpdate(prevProps, prevState) {
		const query = prevState.searchQuery !== this.state.searchQuery
		const myPosts = prevState.myPosts !== this.state.myPosts
		if (query || myPosts) {
			this.updatePosts()
		}
	}

	updatePosts = () => {
		console.log("updating posts on dashboard")
		let posts
		if (this.props.posts.length > 0) {
			posts = this.props.posts.filter(post => post.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
		}
		if (this.state.myPosts) {
			posts = posts.filter(post => post.id === this.props.user.id)
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
		const { searchQuery, myPosts } = this.state
		const posts = searchQuery || myPosts ? this.state.posts : null || this.props.posts
		return (
			<div className='viewContainer'>
				<Search
					change={this.handleChange}
					searchQuery={this.state.searchQuery}
					myPosts={this.state.myPosts}
					reset={this.reset}
					handleSubmit={this.handleSubmit}
				/>
				<div className='posts'>
					{posts &&
						posts.map(({ pid, title, username, pic }) => {
							return (
								<Link key={pid} to={`/post/${pid}`}>
									<div className='postItem'>
										<h2>{title}</h2>
										<div className='postId'>
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
//props
