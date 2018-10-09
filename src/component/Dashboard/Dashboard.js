import React, {Component} from 'react'
import {connect} from 'react-redux'

import axios from 'axios'

import {Icon} from 'semantic-ui-react'
import './dashboard.css'

class Dashboard extends Component{
    constructor(){
        super()
        this.state = {
            myPosts: true,
            searchQuery: '',
            posts: []
        }
    }

    handleSubmit(e){
        e.preventDefault()
        this.getPosts(this.state.myPosts, this.state.searchQuery)
    }
    
    async getPosts(userPosts, search){
       await axios.get(`http://localhost:3001/api/posts/${this.props.state.userId}/?userPosts=${userPosts}&search=${search}`).then(resp => {this.setState({posts: resp.data})}).catch(e => console.log(e))
    }

    componentDidMount(){
        this.getPosts(this.state.myPosts, this.state.searchQuery)
    }

    render(){
        return (
        <div className='container'>
            <div className='dashSearch'>
                <form>
                    <div className="searchbar">
                        <input type='text' placeholder='Search by Title' onChange={(e)=> {this.setState({searchQuery: e.target.value})}}></input>
                        <button id='noBut' type='submit' onClick={(e)=>{this.handleSubmit(e)}}>
                            <Icon name='search' bordered inverted color='orange' />
                        </button>
                        <button onClick={()=> this.setState({searchQuery: '', myPosts: true})}>reset</button>
                    </div>
                </form>
                <div className='check'>
                    <label htmlFor="myPosts">My Posts</label>
                    <input type="checkbox" className='checkbox' checked={this.state.myPosts} onChange={()=> {this.setState({myPosts: !this.state.myPosts})}} />
                </div>
            </div>


            <div className="posts">
            {
                this.state.posts.map(p => {
                    return (
                        <div key={p.id} className='postItem'>
                        <h2>{p.title}</h2>
                           <div><p>by {p.username}</p><img src={p.pic} alt={p.username} /></div>
                        </div>
                    )
                })
            }
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