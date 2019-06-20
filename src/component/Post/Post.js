import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom'
import store, { UPDATE_USER } from "../../ducks/store";
import axios from 'axios'

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			content: "",
			id: 0,
			username: "",
			pic: "",
			img: ""
		};
	}
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
	componentWillReceiveProps(props, state) {
		const { title, content, username, pic, img } = props.myPost;
		this.setState({
			title,
			content,
			username,
			pic,
			img
		});
	}
	render() {
		const { content, img, pic, title, username } = this.state;
		return (
			<div className="postViews">
				<div className="header">
					<h1>{title}</h1>{" "}
					<div className="picEnd">
						<p>by {username}</p>
						<div>
							<img src={pic} alt={username} />
						</div>
					</div>
				</div>
				<div className="content">
					<div className="picc">
						<img src={img} alt={title} />
					</div>
					<div>
						<p>{content}</p>
					</div>
				</div>
			</div>
		);
	}
}
export default connect(state => state)(withRouter(Post));
