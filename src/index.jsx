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
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';

// Stores and Services
import UserStore from './stores/UserStore';
import PostStore from './stores/PostStore';
import AppStore from './stores/AppStore';

// App
import App from './App';

// Good practice: Force to use @actions to modify states on MobX stores.
useStrict(true);

// Initializing router.
const browserHistory = createBrowserHistory();
const routerStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routerStore);

// Initializing stores
const userStore = new UserStore();
const postStore = new PostStore(userStore);
const appStore = new AppStore(routerStore, postStore, userStore);

render(
	<AppContainer>
		<Provider store={appStore}>
			<Router history={history}>
				<App />
			</Router>
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
					<Router history={history}>
						<NextApp />
					</Router>
				</Provider>
			</AppContainer>,
			document.getElementById('root')
		);
	});
}
