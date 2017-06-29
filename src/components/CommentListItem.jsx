import React from 'react';
import { action } from 'mobx';
import { inject, observer, PropTypes } from 'mobx-react';
import { Card, Button } from 'semantic-ui-react';
import Ellipsis from '../utils/Ellipsis';

@inject('store')
@observer
class CommentListItem extends React.Component {
	static propTypes = {
		store: PropTypes.observableObject,
		comment: PropTypes.observableObject
	}

	render() {
		let comment = this.props.comment;
		return (
			<Card>
				<Card.Content>
					<Card.Header>
						{Ellipsis.prepend(comment.author.name, 20)}
					</Card.Header>
					<Card.Meta>
						{comment.author.email}
					</Card.Meta>
					<Card.Description>
						{Ellipsis.prepend(comment.body, 30)}
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

export default CommentListItem;
