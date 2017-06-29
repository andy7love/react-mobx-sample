import React from 'react';
import { observer, PropTypes } from 'mobx-react';
import { Card } from 'semantic-ui-react';
import CommentListItem from './CommentListItem';

@observer
class CommentList extends React.Component {
	static propTypes = {
		comments: PropTypes.arrayOrObservableArray
	}

	render() {
		let comments = (this.props.comments.length === 0) ? '' :
			this.props.comments.map(comment =>
				<CommentListItem key={comment.id} comment={comment} />
			);

		return (
			<Card.Group itemsPerRow="2">
				{comments}
			</Card.Group>
		);
	}
}

export default CommentList;
