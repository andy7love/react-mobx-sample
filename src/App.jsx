import React from 'react';
import { observer, PropTypes } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

@observer
class App extends React.Component {
	render() {
		return (
			<div>
				<button onClick={this.onReset}>
          Seconds passed: {this.props.store.timer}
				</button>
				<DevTools />
			</div>
		);
	}

	onReset = () => {
		this.props.store.resetTimer();
	}
}

App.propTypes = {
	store: PropTypes.observableObject
};

export default App;