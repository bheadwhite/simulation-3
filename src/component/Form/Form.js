import React, { Component } from "react";
import { connect } from "react-redux";
import store, { UPDATE_USER } from "../../ducks/store";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./form.css";

class Form extends Component {
	state = {
		samplePic: "http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png",
		imageURL: "",
		content: "",
		title: ""
	};

	componentDidMount() {
		axios.get("/api/auth/me").then(({ data }) => {
			data
				? store.dispatch({
						type: UPDATE_USER,
						payload: data
				  })
				: this.props.history.push("/");
		});
	}
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
    };

    checkPicture = e => {
        e.target.src = this.state.samplePic
    }

    postNew = () => {
        const {content, title, imageURL} = this.state
		const img = {
            title,
            content,
			img: imageURL
		};
        axios.post(`/api/newPost/${this.props.user.id}`, img).then(res =>
            this.props.history.push('/dashboard')
        );
	}
	render() {
		const imgURL = this.state.imageURL ? this.state.imageURL : this.state.samplePic;
		return (
			<div className="postViews">
				<div className="header">
					<h1>New Post</h1>
				</div>
				<div className="newTitle">
					<h3>Title:</h3>
					<input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
				</div>
				<div className="newImage">
					<img src={imgURL} alt="new pic" onError={this.checkPicture}/>
				</div>
				<div className="newTitle">
					<h3>Image URL:</h3>
					<input
						type="text"
						name="imageURL"
						onChange={this.handleChange}
						value={this.state.imageUrl}
					/>
				</div>
				<div className="newTitle">
					<h3>Content:</h3>
					<textarea name="content" onChange={this.handleChange} value={this.state.content} />
				</div>
				<div>
					<button onClick={this.postNew}>Post</button>
				</div>
			</div>
		);
	}
}

export default connect(state => state)(withRouter(Form));
