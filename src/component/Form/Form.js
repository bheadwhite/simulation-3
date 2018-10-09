import React, {Component} from 'react'
import {connect} from 'react-redux'
import './form.css'

class Form extends Component{
    constructor(props){
        super(props)
        this.state={
            samplePic: 'http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png', 
            imageUrl: '',
            content: '',
            title: '',
            username: this.props.username,
            userId: this.props.userId,
            profilePic: this.props.profilePic
        }
    }
    render(){
        console.log()
        return (
            <div className="postViews">
                <div className="header"><h1>New Post</h1></div>
                <div className='newTitle'>
                    <h3>Title:</h3>
                    <input type='text'  onChange={(e)=>this.setState({title: e.target.value})} value={this.state.title} />
                </div>
                    <div className='newImage'>
                    <img src={this.state.imageUrl === '' ? this.state.samplePic : this.state.imageUrl} alt='new pic' />
                </div>
                <div className='newTitle' >
                    <h3>Image URL:</h3>
                    <input type='text' onChange={(e)=>this.setState({imageUrl: e.target.value})} value={this.state.imageUrl}/>
                </div>
                <div className='newTitle'>
                    <h3>Content:</h3>
                    <textarea onChange={(e)=>this.setState({content: e.target.value})} value={this.state.content}></textarea>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profilePic: state.profilePic,
        userId: state.userId,
        username: state.username
    }
}

export default connect(mapStateToProps, {})(Form)