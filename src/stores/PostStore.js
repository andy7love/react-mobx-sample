import { observable, action } from 'mobx';
import ApiService from '../services/ApiService';
import Post from './models/Post';

/**
 * Store for the Posts.
 * Also provides actions to manage store.
 */
class PostStore {
	userStore;
	apiService;
	@observable posts = [];

	constructor(userStore, apiService = ApiService) {
		this.userStore = userStore;
		this.apiService = apiService;
		this.loadPosts()
			.then(this.loadAllComments);
	}

	getPost = (postId) => this.posts.filter(post => post.id === parseInt(postId)).pop();

	@action
	loadPosts = () => {
		return new Promise((resolve) => {
			// Hardcoded list for now because API does not support that yet.
			let post = new Post(this, 1);
			this.posts.push(post);
			resolve();
		});
	}

	@action
	loadAllComments = () => {
		let promises = this.posts.map(post => post.loadComments());
		return Promise.all(promises);
	}
}

export default PostStore;
