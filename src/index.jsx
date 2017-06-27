require('react-hot-loader/patch');
require('./App.scss');
import React from 'react';
import { useStrict } from 'mobx';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppState from './AppState';
import App from './App';

// Force to use actions to modify state on MobX.
useStrict(true);

const appState = new AppState();

render(
	<AppContainer>
		<App store={appState} />
	</AppContainer>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept('./App', () => {
		const NextApp = require('./App').default;

		render(
			<AppContainer>
				<NextApp store={appState} />
			</AppContainer>,
			document.getElementById('root')
		);
	});
}