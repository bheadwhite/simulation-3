import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Icon} from 'semantic-ui-react'
import './dashboard.css'

class Dashboard extends Component{
    constructor(){
        super()
        this.state = {
            myPosts: false,
            searchQuery: ''
        }
    }

    handleInputChange(e){
        // const target = e.target.value;
    }
    render(){
        console.log(this.props)
        if(this.state.myPosts === true){
            console.log('its true now')
        }
        return (
            <div className='dashSearch'>
                <div className="searchbar">
                <input type='text' placeholder='Search by Title'></input>
                <Icon name='search' bordered inverted color='orange' />
                <button>reset</button>
                </div>
                <label htmlFor="myPosts">My Posts</label>
                <input type="checkbox" className='checkbox' checked onChange={(e)=> {this.handleInputChange(e)}}/>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        myPosts: state.myPosts,
        state

    }
}

export default connect(mapStateToProps, {})(Dashboard)