import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './nav.css'

function Nav(props){
    if(props.location.pathname === '/'){
        return null
    }
    return (
        <div className="nav-sidebar">
            <div className="nav-sidebar2">
                <div className="profile-pic">
                    <div className="pic">
                        <img src={props.profilePic} alt='profile pic' />
                    </div>
                    <p>{props.username}</p>
                </div>
                <Link to="/Dashboard"><button>Home</button></Link>
                <Link to="/new"><button>New Post</button></Link>
            </div>
            <Link to="/"><button>Logout</button></Link>
        </div>
    )
}

function mapStateToProps(state){
    return {
        username: state.username,
        profilePic: state.profilePic
    }
}

export default connect(mapStateToProps)(Nav)