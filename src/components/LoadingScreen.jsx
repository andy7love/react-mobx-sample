import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';
import { Dimmer, Loader } from 'semantic-ui-react'

@inject('store')
@observer
class LoadingScreen extends React.Component {
	static propTypes = {
		store: PropTypes.observableObject
	}

	render() {
		let isLoading = this.props.store.isLoading;
		return (
			<Dimmer active={isLoading} inverted>
				<Loader active={isLoading} size='large'>Loading</Loader>
			</Dimmer>
		);
	}
}

export default LoadingScreen;
