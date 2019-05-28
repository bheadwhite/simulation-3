import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Icon} from 'semantic-ui-react'
import { reset } from './../../ducks/reducer'

import axios from 'axios'
import './nav.css'

class Nav extends Component {
    state={

    }

    componentDidMount(){
        axios.get('/api/auth/me')
        .then(resp => {
            // console.log(resp)
        })
    }

    render(){
    const styles = {
        icon: {
            margin: '15px 5px 30px 5px',
        },
        edit: {
            paddingLeft: '8px'
        },
        power: {
            marginBottom: '39px'
        }
    }
    if(this.props.location.pathname === '/'){
        return null
    }
    return (
        <div className="nav-sidebar">
            <div className="nav-sidebar2">
                <div className="profile-pic">
                    <div className="pic">
                        <img src={this.props.profilePic} alt='profile pic' />
                    </div>
                    <p>{this.props.username}</p>
                </div>
                <Link to="/Dashboard"><Icon inverted size="huge" name='home' style={styles.icon}/></Link>
                <Link to="/new"><Icon name="edit outline" size='huge' style={styles.edit}/></Link>
            </div>
            <Link onClick={()=> { axios.get('http://localhost:3001/api/logout/me');this.props.reset()}}to="/"><Icon size='huge' name="power" style={styles.power}/></Link>
        </div>
    )
}
}

function mapStateToProps(state){
    return {
        username: state.username,
        profilePic: state.profilePic
    }
}
const mapDispatchToProps = () => {
    return {
        reset
    }
}
export default connect(mapStateToProps, mapDispatchToProps() )(Nav)