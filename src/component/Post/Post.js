import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import store, { UPDATE_USER, UPDATE_POSTS } from "../../ducks/store"
import "./Post.css"
import axios from "axios"

class Post extends Component {
	state = {
		myPost: {
			title: "",
			content: "",
			username: "",
			pic: "",
			img: ""
		},
		samplePic: "http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png",
		author: false
	}
	// shouldComponentUpdate(){
	// 	if(this.state.myPost.id){
	// 		return true
	// 	} else {
	// 		return false
	// 	}
	// }
	componentDidUpdate() {
		if (this.state.myPost.id) {
			if(this.props.user.id === this.state.myPost.id && !this.state.author){
				this.setState({
					author: true
				})
			} else if(this.props.user.id !== this.state.myPost.id && this.state.author){
				this.setState({
					author: false
				})
			}
		}
	}
	componentDidMount() {
		console.log("mounted")
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
			const post = this.props.posts.filter(p => p.pid === Number(this.props.match.params.postid))
			this.setState({
				myPost: post[0]
			})
		})
	}
	picError = e => {
		e.target.src = this.state.samplePic
	}
	render() {
		console.log(this.state.myPost)
		console.log(this.props)
		const { content, img, pic, title, username } = this.state.myPost
		const nonAuthorPost = (
			<div className='header'>
				<h1>{title}</h1>
				<div className='picEnd'>
					<p>by {username}</p>
					<div>
						<img src={pic} alt={username} />
					</div>
				</div>
			</div>
		)
		const authoredPost = (
			<div className='header'>
				<h1>{title}</h1>
				<div className='picEnd'>
					<button>edit</button>
					<button>delete</button>
					<p>by {username}</p>
					<div>
						<img src={pic} alt={username} />
					</div>
				</div>
			</div>
		)
		return (
			<div className='viewContainer'>
				<div className='Post'>
					{!this.state.author && nonAuthorPost}
					{this.state.author && authoredPost}
					<div className='content'>
						<div className='pic'>
							<img src={img} alt={title} onError={this.picError} />
						</div>
						<div className='description'>
							<p>{content}</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default connect(state => state)(withRouter(Post))
