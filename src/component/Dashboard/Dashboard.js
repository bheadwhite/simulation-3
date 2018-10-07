import React, {Component} from 'react'
import {connect} from 'react-redux'

class Dashboard extends Component{
    constructor(){
        super()
        this.state = {
            myPosts: false
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
            <div>
                <div className="searchbar">
                <input type='text' ></input>
                <button>search</button>
                <button>reset</button>
                <label htmlFor="myPosts">My Posts</label>
                <input type="checkbox" checked onChange={(e)=> {this.handleInputChange(e)}}/>
                </div>
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