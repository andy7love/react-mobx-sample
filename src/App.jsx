import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { MobxRouter } from 'mobx-router';
import LoadingScreen from './components/LoadingScreen';

@inject('uiStore')
@observer
class App extends React.Component {
	render() {
		return (
			<div>
				<LoadingScreen />
				<MobxRouter store={this.props.uiStore} />
				<DevTools />
			</div>
		);
	}
}

App.propTypes = {
	uiStore: PropTypes.observableObject
};

export default App;
