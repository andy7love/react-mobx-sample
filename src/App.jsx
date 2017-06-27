import React from 'react';
import { observer, PropTypes } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

@observer
class App extends React.Component {
	render() {
		return (
			<div>
				<button onClick={this.props.store.resetTimer}>
					Seconds passed: {this.props.store.timer}
				</button>
				<DevTools />
			</div>
		);
	}
}

App.propTypes = {
	store: PropTypes.observableObject
};

export default App;