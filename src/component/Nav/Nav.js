import React, { Component } from "react"
import { Icon } from "semantic-ui-react"
import { connect } from "react-redux"

import "./nav.css"
import axios from "axios"

class Nav extends Component {
	logout = () => {
		axios.get("/api/logout").then(res => this.props.history.push("/"))
	}

	render() {
		const { user } = this.props
		if (this.props.location.pathname === "/") {
			return null
		}
		return (
			<div className='nav'>
				<div className='profile-pic'>
					<div className='pic'>
						<img src={user.pic} alt='profile pic' />
					</div>
					<p className="navUser">{user.username}</p>
				</div>
				<div className='links'>
					<Icon id='homeBtn' name='home' size='huge' inverted onClick={() => this.props.history.push("/dashboard")} />
					<Icon id='editBtn' name='edit outline' size='huge' onClick={() => this.props.history.push("/new")} />
				</div>
				<div className='power'>
					<Icon id='powerBtn' name='power' size='huge' onClick={this.logout} />
				</div>
			</div>
		)
	}
}

export default connect(state => state)(Nav)
