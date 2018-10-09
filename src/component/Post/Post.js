import React, {Component} from 'react'
import {connect} from 'react-redux'

class Post extends Component{
    constructor(props){
        super(props)
        this.state= {
            title: '',
            content: '',
            id: 0,
            username: '',
            pic: '',
            img: ''
        }
    }
    componentWillReceiveProps(props, state){
       const {title, content, username, pic, img} = props.myPost 
        this.setState({
            title,
            content,
            username,
            pic,
            img
        })
    }
    render(){
        const {content, img, pic, title, username} = this.state
        return (
            <div className="postViews">
                <div className="header"><h1>{title}</h1> <div className='picEnd'><p>by {username}</p><div><img src={pic} alt={username} /></div></div></div>
                <div className='content'>
                    <div className='picc'><img src={img} alt={title}/></div>
                    <div>
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        myPost: state.myPost
    }
}

// const mapDispatchToProps = () => {
//     return {

//     }
// }


export default connect(mapStateToProps, {})(Post)