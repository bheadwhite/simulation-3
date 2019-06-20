import React from "react";
import { Icon } from "semantic-ui-react";

const search = props => {
	return (
		<div className="dashSearch">
			<div className="searchbar">
				<input
					type="text"
					name="searchQuery"
					placeholder="Search by Title"
					onChange={props.change}
					value={props.searchQuery}
				/>
				<button
					id="noBut"
					type="submit"
					onClick={e => {
						this.handleSubmit(e);
					}}>
					<Icon name="search" bordered inverted color="orange" />
				</button>
				<button id="reset" onClick={props.reset}>
					Reset
				</button>
			</div>
			<div className="check">
				<label htmlFor="myPosts">My Posts</label>
				<input
					type="checkbox"
					name="myPosts"
					className="checkbox"
					checked={props.myPosts}
					onChange={props.change}
				/>
			</div>
		</div>
	);
};

export default search;
