import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';
import PostComment from '../components/PostComment';

@inject('uiStore')
@inject('postStore')
@observer
class PostComments extends React.Component {
	render() {
		let post = this.props.postStore.getPost(this.props.uiStore.router.params.postId);
		if(	this.props.uiStore.isLoading ||
			post === undefined) {
			return (<div></div>);
		}

		let comments = (post.comments.length > 0) ? post.comments.map(comment => <PostComment key={comment.id} comment={comment} />) : '';

		return (
			<div>
				Viewing comments for post {post.id}
				<br /><br />
				<ul>
					{comments}
				</ul>
			</div>
		);
	}
}

PostComments.propTypes = {
	uiStore: PropTypes.observableObject,
	postStore: PropTypes.objectOrObservableObject
};

export default PostComments;
