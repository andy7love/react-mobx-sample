import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';
import CommentList from '../components/CommentList';

@inject('store')
@observer
class PostComments extends React.Component {
	render() {
		let post = this.props.store.currentPost;
		if (post === undefined) {
			return (<div></div>);
		}

		return (
			<div>
				<h2>Viewing comments for post {post.id}</h2>
				<CommentList comments={post.comments} />
			</div>
		);
	}
}

PostComments.propTypes = {
	store: PropTypes.observableObject
};

export default PostComments;
