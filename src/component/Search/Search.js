import React from "react"

const search = props => {
	return (
		<div className='searchContainer'>
			<div className='searchbar'>
				<input type='text' name='searchQuery' placeholder='Search by Title' onChange={props.change} value={props.searchQuery} />
			</div>
			<div className='check'>
				<label htmlFor='myPosts'>My Posts</label>
				<input type='checkbox' name='myPosts' className='checkbox' checked={props.myPosts} onChange={props.change} />
			</div>
		</div>
	)
}

export default search
