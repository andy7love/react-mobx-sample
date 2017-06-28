import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';

@inject('uiStore')
@inject('postStore')
@observer
class CommentDetail extends React.Component {
	render() {
		let post = this.props.postStore.getPost(this.props.uiStore.router.params.postId);
		if(	this.props.uiStore.isLoading ||
			post === undefined ||
			post.getComment(this.props.uiStore.router.params.commentId) === undefined) {
			return (<div></div>);
		}

		let comment = post.getComment(this.props.uiStore.router.params.commentId);

		return (
			<div>
				Im the comment's detail.
				{comment.body}
				<br /><br />
				{comment.author.name}
				<br /><br />
				{comment.author.email}
			</div>
		);
	}
}

CommentDetail.propTypes = {
	uiStore: PropTypes.observableObject,
	postStore: PropTypes.observableObject
};

export default CommentDetail;
