import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import store, { UPDATE_POSTS } from "../../ducks/store"
import axios from "axios"
import "./form.css"

class Form extends Component {
	state = {
		samplePic: "http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png",
		imageURL: "",
		content: "",
		title: ""
	}
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	checkPicture = e => {
		e.target.src = this.state.samplePic
	}

	postNew = () => {
		const { content, title, imageURL } = this.state
		const img = {
			title,
			content,
			img: imageURL
		}
		axios.post(`/api/newPost/${this.props.user.id}`, img).then(res => {
			store.dispatch(
				{
					type: UPDATE_POSTS,
					payload: res.data
				},
				this.props.history.push("/dashboard")
			)
		})
	}
	render() {
		const { imageURL, samplePic, content, title } = this.state
		const imgURL = imageURL ? imageURL : samplePic
		return (
			<div className='viewContainer'>
				<div className='Form'>
					<div className='header'>
						<h1>New Post</h1>
					</div>
					<div className='wrapper'>
						<div className='newTitle'>
							<h3>Title:</h3>
							<input type='text' name='title' onChange={this.handleChange} value={title} />
						</div>
						<div className='newImage'>
							<img src={imgURL} alt='new pic' onError={this.checkPicture} />
						</div>
						<div className='newTitle'>
							<h3>Image URL:</h3>
							<input type='text' name='imageURL' onChange={this.handleChange} value={imageURL} />
						</div>
						<div className='newTitle'>
							<h3>Content:</h3>
							<textarea name='content' onChange={this.handleChange} value={content} />
						</div>
						<div>
							<button className='postBtn' onClick={this.postNew}>
								Post
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(state => state)(withRouter(Form))
