require('react-hot-loader/patch');

// Styles
require('normalize.css/normalize.css');
require('semantic-ui-css/semantic.min.css');
require('./App.scss');

// Framework
import React from 'react';
import { useStrict } from 'mobx';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';

// Stores and Services
import ApiService from './services/ApiService';
import UserStore from './stores/UserStore';
import PostStore from './stores/PostStore';
import AppStore from './stores/AppStore';

// App
import App from './App';

// Good practice: Force to use @actions to modify states on MobX stores.
useStrict(true);

// Initializing stores
const apiService = new ApiService();
const userStore = new UserStore(apiService);
const postStore = new PostStore(apiService, userStore);
const appStore = new AppStore(apiService, postStore, userStore);

render(
	<AppContainer>
		<Provider store={appStore}>
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
				<Provider store={appStore}>
					<NextApp />
				</Provider>
			</AppContainer>,
			document.getElementById('root')
		);
	});
}
