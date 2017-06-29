import React from 'react';
import { inject, observer, PropTypes as PropTypes } from 'mobx-react';
import CommentList from '../components/CommentList';

@inject('store')
@observer
class PostComments extends React.Component {
	static propTypes = {
		store: PropTypes.observableObject
	}

	render() {
		let post = this.props.store.currentPost;
		if (post === undefined) {
			return null;
		}

		return (
			<div>
				<h2>Viewing comments for post {post.id}</h2>
				<CommentList comments={post.comments} />
			</div>
		);
	}
}

export default PostComments;
