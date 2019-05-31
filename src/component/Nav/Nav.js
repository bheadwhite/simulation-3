import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import store from './../../ducks/store'
import axios from 'axios'
import './nav.css'

class Nav extends Component {
    constructor(){
        super()
        const reduxState = store.getState()
        this.state = {
            username: reduxState.user.username,
            profilePic: reduxState.user.pic
        }
    }
    componentDidMount(){
        store.subscribe(() => {
            const reduxState = store.getState()
            this.setState({
                username: reduxState.user.username,
                profilePic: reduxState.user.pic
            })
        })
        // axios.get('/api/auth/me')
        // .then(resp => {
        //     // console.log(resp)
        // })
    }

    logout = () => {
        // axios.get('/api/logout/me')
        this.props.history.push('/')
    }

    render(){
        console.log(this.props)
        const styles = {
            icon: { margin: '15px 5px 30px 5px' },
            edit: { paddingLeft: '8px' },
            power: { marginBottom: '39px' }
        }
        if(this.props.location.pathname === '/'){
            return null
        }
        return (
            <div className="nav-sidebar">
                <div className="nav-sidebar2">
                    <div className="profile-pic">
                        <div className="pic">
                            <img src={this.state.profilePic} alt='profile pic' />
                        </div>
                        <p>{this.state.username}</p>
                    </div>
                    <Link to="/Dashboard">
                        <Icon 
                            name='home' 
                            size="huge" 
                            inverted 
                            style={styles.icon}/>
                    </Link>
                    <Link to="/new">
                        <Icon 
                            name="edit outline" 
                            size='huge' 
                            style={styles.edit}/>
                    </Link>
                </div>
                <Icon 
                    name="power" 
                    size='huge' 
                    onClick={this.logout} 
                    style={styles.power}/>
            </div>
        )
    }
}

export default Nav