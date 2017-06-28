import React from 'react';
import { action } from 'mobx';
import { inject, observer, PropTypes } from 'mobx-react';
import { Card, Button } from 'semantic-ui-react';

@inject('store')
@observer
class CommentListItem extends React.Component {
	render() {
		let comment = this.props.comment;
		return (
			<Card>
				<Card.Content>
					<Card.Header>
						{comment.author.name}
					</Card.Header>
					<Card.Meta>
						{comment.author.email}
					</Card.Meta>
					<Card.Description>
						{comment.body}
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<div className='ui buttons'>
						<Button basic color='grey' onClick={this.goToCommentDetail}>View details</Button>
					</div>
				</Card.Content>
			</Card>
		);
	}

	@action
	goToCommentDetail = () => {
		this.props.store.goToCommentDetail(this.props.comment);
	}
}

CommentListItem.propTypes = {
	store: PropTypes.observableObject,
	comment: PropTypes.observableObject
};

export default CommentListItem;
