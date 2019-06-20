import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store, { UPDATE_POSTS, UPDATE_USER } from "./../../ducks/store";
import Search from "../Search/Search";
import axios from "axios";

import "./dashboard.css";

class Dashboard extends Component {
	state = {
		myPosts: true,
		searchQuery: ""
	};
	componentDidMount() {
		if (!this.props.user.username) {
			axios.get("/api/auth/me").then(({ data }) => {
				data
					? store.dispatch({
							type: UPDATE_USER,
							payload: data
					  })
					: this.props.history.push("/");
			});
		}
		axios.get("/api/posts").then(({ data }) => {
			store.dispatch({
				type: UPDATE_POSTS,
				payload: data
			});
		});
	}

	handleSubmit = e => {
		e.preventDefault();
		this.getPosts();
	}
	reset = e => {
		e.preventDefault()
		this.setState({
			myPosts: true,
			searchQuery: ""
		})
	}

	getPosts = () => {
		const { myPosts, searchQuery } = this.state;
		axios
			.get(`/api/posts?userPosts=${myPosts}&search=${searchQuery}`)
			.then(resp => {
				this.setState({ posts: resp.data, searchQuery: "" });
				this.props.setPosts(resp.data);
			})
			.catch(e => console.log(e));
	};
	handleChange = e => {
		if (e.target.name === "myPosts") {
			this.setState({
				[e.target.name]: !this.state.myPosts
			});
		} else {
			this.setState({
				[e.target.name]: e.target.value
			});
		}
	};

	setPost = p => {
		console.log(p.pid);
		this.props.setPost(p.pid);
	};

	render() {
		return (
			<div className="container">
				<Search
					change={this.handleChange}
					searchQuery={this.state.searchQuery}
					myPosts={this.state.myPosts}
					reset={this.reset}
				/>
				<div className="posts">
					{this.props.posts &&
						this.props.posts.map(post => {
							return (
								<Link key={post.pid} to={`/post/${post.pid}`}>
									<div className="postItem" onClick={() => this.setPost(post)}>
										<h2>{post.title}</h2>
										<div>
											<p>by {post.username}</p>
											<img src={post.pic} alt={post.username} />
										</div>
									</div>
								</Link>
							);
						})}
				</div>
			</div>
		);
	}
}

export default connect(state => state)(Dashboard);
