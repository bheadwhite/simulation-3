import React from "react"
import './Search.css'

const stopPropagation = e => {
e.stopPropagation()
}

const search = props => {
	let searchContainer
	if(props.searchBarHide){
		searchContainer = 'searchContainer hidden'
	} else {searchContainer = 'searchContainer'}
	return (
		<div className={searchContainer} onClick={props.hideSearch}>
			<div className='searchbar' onClick={stopPropagation}>
				<input type='text' name='searchQuery' placeholder='Search by Title' onChange={props.change} value={props.searchQuery} />
			</div>
			<div className='check' onClick={stopPropagation}>
				<label htmlFor='myPosts'>My Posts</label>
				<input type='checkbox' name='myPosts' className='checkbox' checked={props.myPosts} onChange={props.change} />
			</div>
		</div>
	)
}

export default search
