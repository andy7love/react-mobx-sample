import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';

@inject('uiStore')
@observer
class LoadingScreen extends React.Component {
	render() {
		let loading = (this.props.uiStore.isLoading) ? 'Loading...' : '';
		return (
			<div>
				{loading}
			</div>
		);
	}
}

LoadingScreen.propTypes = {
	uiStore: PropTypes.observableObject
};

export default LoadingScreen;
