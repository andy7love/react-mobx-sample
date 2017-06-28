/* globals API_PATH */
import { observable, action } from 'mobx';
import format from 'string-format';

class ApiService {
	baseURL = API_PATH; // provided by WebpackDefinePlugin
	paths = {
		post: {
			getPost: (postId) => format('/posts/{0}', postId),
			getComments: (postId) => format('/posts/{0}/comments', postId)
		}
	};

	@observable pendingRequests = 0;

	@action
	callApi = (path) => {
		this.pendingRequests++;
		return fetch(this.baseURL + path, {
			credentials: 'include'
		}).then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('Network response error.');
			}
		}).then((json) => {
			// Hardcoded delay for demo purposes.
			// (otherwise will be too fast to show LoadingScreen)
			return new Promise((resolve) => {
				setTimeout(() => {
					this.pendingRequests--;
					resolve(json);
				}, 2000);
			});
		}).catch((error) => {
			this.pendingRequests--;
			throw new Error(error);
		});
	}

    /**
     * Retrieve all comments of a given post.
     */
	fetchPostComments = (postId) => {
		return this.callApi(this.paths.post.getComments(postId));
	}
}

export default ApiService;
