import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import store, {UPDATE_POSTS} from '../../ducks/store'
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
	componentDidUpdate() {
		if (this.state.myPost.id) {
			if (this.props.user.id === this.state.myPost.id && !this.state.author) {
				this.setState({
					author: true
				})
			} else if (this.props.user.id !== this.state.myPost.id && this.state.author) {
				this.setState({
					author: false
				})
			}
		}
	}
	componentDidMount() {
		console.log('Post Mounted')
		const post = this.props.posts.filter(p => p.pid === Number(this.props.match.params.postid))
		if(post[0]){
			this.setState({
				myPost: post[0]
			})
		}
	}
	delete = id => {
		const myPost = this.state.myPost
		axios.delete(`/api/post/${myPost.pid}`).then(res => {
			if(Array(res.data)){
				store.dispatch({
					type: UPDATE_POSTS,
					payload: res.data
				},
				this.props.history.push('/dashboard')
				)
			}
		})
	}
	picError = e => {
		e.target.src = this.state.samplePic
	}
	render() {
		console.log(this.state)
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
					<button id='delete' onClick={this.delete.bind(this)}>
						delete
					</button>
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
