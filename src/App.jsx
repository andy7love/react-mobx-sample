import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { MobxRouter } from 'mobx-router';
import LoadingScreen from './components/LoadingScreen';
import MainBreadcrumb from './components/MainBreadcrumb';

@inject('store')
@observer
class App extends React.Component {
	render() {
		return (
			<div>
				<LoadingScreen />
				<MainBreadcrumb />
				<MobxRouter />
				<DevTools />
			</div>
		);
	}
}

App.propTypes = {
	store: PropTypes.observableObject
};

export default App;
