import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import store, { UPDATE_USER } from "../../ducks/store"
import "./Post.css"
import axios from "axios"

class Post extends Component {
	state = {
		title: "",
		content: "",
		username: "",
		pic: "",
		img: "",
		samplePic: "http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png"
	}
	componentDidMount() {
		axios.get("/api/auth/me").then(({ data }) => {
			data
				? store.dispatch({
						type: UPDATE_USER,
						payload: data
				  })
				: this.props.history.push("/")
		})
	}
	picError = e => {
		e.target.src = this.state.samplePic
	}
	render() {
		const post = this.props.posts.filter(p => p.pid === Number(this.props.match.params.postid))
		const { content, img, pic, title, username } = post[0] || this.state
		return (
			<div className='viewContainer'>
				<div className='Post'>
					<div className='header'>
						<h1>{title}</h1>
						<div className='picEnd'>
							<p>by {username}</p>
							<div>
								<img src={pic} alt={username} />
							</div>
						</div>
					</div>
					<div className='content'>
						<div className='pic'>
							<img src={img} alt={title} onError={this.picError}/>
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
