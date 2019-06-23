import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";

import "./nav.css";
import axios from "axios";

class Nav extends Component {


	logout = () => {
        axios.get('/api/logout').then(res =>
            this.props.history.push("/")
        )
	};

	render() {
        const {user} = this.props
		const styles = {
			icon: { margin: "15px 5px 30px 5px" },
			edit: { paddingLeft: "8px" },
			power: { margin: "0px auto 39px" }
		};
		if (this.props.location.pathname === "/") {
			return null;
		}
		return (
			<div className="nav-sidebar">
				<div className="nav-sidebar2">
					<div className="profile-pic">
						<div className="pic">
							<img src={user.pic} alt="profile pic" />
						</div>
						<p>{user.username}</p>
					</div>
					<Link to="/Dashboard">
						<Icon name="home" size="huge" inverted style={styles.icon} />
					</Link>
					<Link to="/new">
						<Icon name="edit outline" size="huge" style={styles.edit} />
					</Link>
				</div>
				<Icon
					name="power"
					size="huge"
					onClick={this.logout}
					style={styles.power}
				/>
			</div>
		);
	}
}

export default connect(state => state)(Nav);
