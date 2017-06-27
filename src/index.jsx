require('react-hot-loader/patch');
require('./App.scss');
import React from 'react';
import { useStrict } from 'mobx';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppState from './AppState';
import {Provider} from 'mobx-react';
import App from './App';

// Force to use actions to modify state on MobX.
useStrict(true);

const appState = new AppState();

render(
	<AppContainer>
		<Provider store={appState}>
			<App />
		</Provider>
	</AppContainer>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept('./App', () => {
		const NextApp = require('./App').default;

		render(
			<AppContainer>
				<Provider store={appState}>
					<NextApp />
				</Provider>
			</AppContainer>,
			document.getElementById('root')
		);
	});
}