import { computed, action, autorun } from 'mobx';
import ApiService from '../services/ApiService';
import RouterService from '../services/RouterService';

/**
 * Store that represents the state of the app's user interface.
 * Also provides UI actions to change app state.
 * And it contains reference for others domain stores.
 * Some app states are derived from domain stores.
 */
class AppStore {
	apiService;
	routerService;
	postStore;
	userStore;
	routerStore;
	routes;
	storeHandler;

	constructor(routerStore, postStore, userStore, apiService = ApiService, routerService = RouterService) {
		this.routerService = routerService;
		this.apiService = apiService;
		this.postStore = postStore;
		this.userStore = userStore;
		this.routerStore = routerStore;

		this.storeHandler = autorun(() => {
			// Fallback to home page if url was not found.
			let currentMatch = this.routerService.getCurrentMatch(this.routerStore.location.pathname);
			if (currentMatch === undefined) {
				this.goToHome();
			}
		});
	}

	@action
	goTo(route, params) {
		let path = this.routerService.getRoute(route, params);
		this.routerStore.push(path);
	}

	@action
	goToHome = () => {
		// Hardcoded home page.
		// There is not "landing page" yet.
		this.goTo(this.routerService.paths.postComments, {
			postId: 1
		});
	}

	@action
	goToPostComments = (post) => {
		if (typeof post !== 'number') {
			post = this.currentPost;
		}
		this.goTo(this.routerService.paths.postComments, {
			postId: post.id
		});
	}

	@action
	goToCommentDetail = (comment) => {
		this.goTo(this.routerService.paths.commentDetail, {
			postId: comment.postId,
			commentId: comment.id
		});
	}

	@computed
	get isLoading() {
		return this.apiService.pendingRequests > 0;
	}

	@computed
	get routeParams() {
		return this.routerService.getRouteParams(this.routerStore.location.pathname);
	}

	@computed
	get currentPost() {
		if (this.routeParams.postId === 0 ||
			this.isLoading ||
			this.postStore.posts.length === 0) {
			return undefined;
		}

		return this.postStore.getPost(this.routeParams.postId);
	}

	@computed
	get currentComment() {
		if (this.routeParams.commentId === 0 ||
			this.isLoading ||
			this.currentPost === undefined) {
			return undefined;
		}

		return this.currentPost.getComment(this.routeParams.commentId);
	}

	dispose() {
		this.storeHandler();
	}
}

export default AppStore;
