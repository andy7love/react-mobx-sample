import React from 'react';
import { action } from 'mobx';
import { inject, observer, PropTypes } from 'mobx-react';

@inject('uiStore')
@observer
class PostComment extends React.Component {
	render() {
		return (
			<li>
				{this.props.comment.body}
				<button onClick={this.goToCommentDetail}>Go</button>
			</li>
		);
	}

	@action
	goToCommentDetail = () => {
		this.props.uiStore.goToCommentDetail(this.props.comment);
	}
}

PostComment.propTypes = {
	uiStore: PropTypes.observableObject,
	comment: PropTypes.observableObject
};

export default PostComment;
