require('react-hot-loader/patch');
require('./App.scss');
import React from 'react';
import { useStrict } from 'mobx';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';

// Stores and Services
import ApiService from './services/ApiService';
import UserStore from './stores/UserStore';
import PostStore from './stores/PostStore';
import UIStore from './stores/UIStore';

import App from './App';

// Force to use @actions to modify states on MobX stores.
useStrict(true);

// Initialize stores.
const apiService = new ApiService();
const userStore = new UserStore(apiService);
const postStore = new PostStore(apiService, userStore);
const uiStore = new UIStore(apiService);

render(
	<AppContainer>
		<Provider
			uiStore={uiStore}
			userStore={userStore}
			postStore={postStore} >
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
				<Provider
					uiStore={uiStore}
					userStore={userStore}
					postStore={postStore} >
					<NextApp />
				</Provider>
			</AppContainer>,
			document.getElementById('root')
		);
	});
}
