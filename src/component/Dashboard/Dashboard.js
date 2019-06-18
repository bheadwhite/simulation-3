import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import store, { UPDATE_POSTS } from './../../ducks/store'
import axios from 'axios'

import { Icon } from 'semantic-ui-react'
import './dashboard.css'


class Dashboard extends Component {
    constructor() {
        super()
        const reduxState = store.getState()
        this.state = {
            myPosts: true,
            searchQuery: '',
            posts: reduxState.posts
        }
    }
    componentDidMount() {
        axios.get('/api/posts')
            .then(resp => {
                if (resp.data.authenticated) {
                    this.props.history.push('/')
                } else {
                    store.dispatch({
                        type: UPDATE_POSTS,
                        payload: resp.data
                    })
                }
            })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.getPosts()
    }

    getPosts = () => {
        const { myPosts, searchQuery } = this.state
        axios.get(`/api/posts?userPosts=${myPosts}&search=${searchQuery}`)
            .then(resp => {
                this.setState({ posts: resp.data, searchQuery: '' })
                this.props.setPosts(resp.data)
            })
            .catch(e => console.log(e))
    }

    setPost = (p) => {
        console.log(p.pid)
        this.props.setPost(p.pid)
    }


    render() {
        return (
            <div className='container'>
                <div className='dashSearch'>
                    <form>
                        <div className="searchbar">
                            <input 
                                type='text' 
                                placeholder='Search by Title' 
                                onChange={(e) => { this.setState({ searchQuery: e.target.value }) }} 
                                value={this.state.searchQuery}></input>
                            <button 
                                id='noBut' 
                                type='submit' 
                                onClick={(e) => { this.handleSubmit(e) }}>
                                <Icon 
                                    name='search' 
                                    bordered 
                                    inverted 
                                    color='orange' />
                            </button>
                            <button id='reset' onClick={async (e) => { await this.setState({ searchQuery: '' }); this.getPosts() }}>Reset</button>
                        </div>
                    </form>
                    <div className='check'>
                        <label htmlFor="myPosts">My Posts</label>
                        <input 
                            type="checkbox" 
                            className='checkbox' 
                            checked={this.state.myPosts} 
                            onChange={() => { this.setState({ myPosts: !this.state.myPosts }) }} />
                    </div>
                </div>

                <div className="posts">
                    {this.state.posts.length > 1 && this.state.posts.map(p => {
                        return (
                            <Link key={p.pid} to={`/post/${p.pid}`}>
                                <div className='postItem' onClick={() => this.setPost(p)}>
                                    <h2>{p.title}</h2>
                                    <div>
                                        <p>by {p.username}</p>
                                        <img src={p.pic} alt={p.username} />
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}
// function mapStateToProps(state){
//     return {
//         myPosts: state.myPosts,
//         state
//     }
// }

// const mapDispatchToProps = () => {
//     return {
//         setPosts,
//         setPost
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps())(Dashboard)
export default Dashboard