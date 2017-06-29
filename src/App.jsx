import React from 'react';
import { inject, observer, PropTypes } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { Route, Switch } from 'react-router';
import RouterService from './services/RouterService';

// Components.
import LoadingScreen from './components/LoadingScreen';
import MainBreadcrumb from './components/MainBreadcrumb';

// Views.
import PostComments from './views/PostComments';
import CommentDetail from './views/CommentDetail';

@inject('store')
@observer
class App extends React.Component {
	static propTypes = {
		store: PropTypes.observableObject
	}

	render() {
		return (
			<div>
				<LoadingScreen />
				<MainBreadcrumb />
				<Switch location={this.props.store.routerStore.location}>
					<Route exact path={RouterService.paths.postComments} component={PostComments} />
					<Route exact path={RouterService.paths.commentDetail} component={CommentDetail} />
				</Switch>
				<DevTools />
			</div>
		);
	}
}

export default App;
