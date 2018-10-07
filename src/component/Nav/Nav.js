import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Icon} from 'semantic-ui-react'
import { reset } from './../../ducks/reducer'
import './nav.css'

function Nav(props){
    const styles = {
        icon: {
            margin: '20px 5px 60px 5px',
        },
        edit: {
            paddingLeft: '8px'
        },
        power: {
            marginBottom: '35px'
        }
    }
    if(props.location.pathname === '/'){
        return null
    }
    console.log(props)
    return (
        <div className="nav-sidebar">
            <div className="nav-sidebar2">
                <div className="profile-pic">
                    <div className="pic">
                        <img src={props.profilePic} alt='profile pic' />
                    </div>
                    <p>{props.username}</p>
                </div>
                <Link to="/Dashboard"><Icon color='rey' inverted size="huge" name='home' style={styles.icon}/></Link>
                <Link to="/new"><Icon name="edit outline" size='huge' style={styles.edit}/></Link>
            </div>
            <Link onClick={()=> {props.reset()}}to="/"><Icon color='white' size='huge' name="power" style={styles.power}/></Link>
        </div>
    )
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