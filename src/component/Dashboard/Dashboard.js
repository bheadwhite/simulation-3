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
        this.getPosts()
    }
    
    async getPosts(){
        const {userId} = this.props.state
        const {myPosts, searchQuery} = this.state
       await axios.get(`http://localhost:3001/api/posts/${userId}/?userPosts=${myPosts}&search=${searchQuery}`).then(resp => {this.setState({posts: resp.data, searchQuery: ''})}).catch(e => console.log(e))
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
                        <input type='text' placeholder='Search by Title' onChange={(e)=> {this.setState({searchQuery: e.target.value})}} value={this.state.searchQuery}></input>
                        <button id='noBut' type='submit' onClick={(e)=>{this.handleSubmit(e)}}>
                            <Icon name='search' bordered inverted color='orange' />
                        </button>
                        <button onClick={async (e)=> {await this.setState({searchQuery: ''}); this.getPosts()}}>reset</button>
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