import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';
import { Card, Button } from 'semantic-ui-react';

@inject('store')
@observer
class CommentDetail extends React.Component {
	static propTypes = {
		store: PropTypes.observableObject
	}

	render() {
		let comment = this.props.store.currentComment;
		if (comment === undefined) {
			return null;
		}

		return (
			<div>
				<h2>Viewing comment {comment.id}</h2>
				<Card>
					<Card.Content extra>
						<div className='ui buttons'>
							<Button basic color='grey' onClick={this.props.store.goToPostComments}>Back to Post</Button>
						</div>
					</Card.Content>
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
				</Card>
			</div>
		);
	}
}

export default CommentDetail;
