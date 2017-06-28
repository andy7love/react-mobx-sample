import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';
import { Breadcrumb, Divider } from 'semantic-ui-react';

@inject('store')
@observer
class MainBreadcrumb extends React.Component {
	render() {
		return (
			<Breadcrumb className="main-breadcrumb">
				{this.getBreadcrumbContent()}
			</Breadcrumb>
		);
	}

	getBreadcrumbContent = () => {
		let breadcrumb = this.getBreadcrumbItems().map((item, i) =>
			<Breadcrumb.Section
				key={i * 2}
				link={item.link}
				onClick={item.onClick}
				active={item.active}
			>
				{item.name}
			</Breadcrumb.Section>
		);

		for (var i = 1; i < breadcrumb.length; i += 2) {
			breadcrumb.splice(i, 0, <Breadcrumb.Divider key={i} icon='right chevron' />);
		}

		return breadcrumb;
	}

	getBreadcrumbItems = () => {
		let breadCrumbItems = [{
			name: 'Home',
			onClick: this.props.store.goToHome,
			link: true,
			active: false
		}];

		let commentActive = (
			this.props.store.routeParams.commentId > 0 &&
			this.props.store.currentComment !== undefined
		);

		if (!this.props.store.isLoading &&
			this.props.store.currentPost !== undefined) {
			breadCrumbItems.push({
				name: 'Post' + this.props.store.currentPost.id,
				onClick: this.props.store.goToPostComments,
				link: commentActive,
				active: !commentActive
			});
		}

		if (commentActive) {
			breadCrumbItems.push({
				name: 'Comment ' + this.props.store.currentComment.id,
				onClick: null,
				link: false,
				active: true
			});
		}

		return breadCrumbItems;
	}
}

MainBreadcrumb.propTypes = {
	store: PropTypes.observableObject
};

export default MainBreadcrumb;
