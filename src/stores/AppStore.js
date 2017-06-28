import { observable, computed, action, autorun } from 'mobx';
import { RouterStore, startRouter } from 'mobx-router';
import Routes from '../config/Routes';

/**
 * Store that represents the state of the app's user interface.
 * Also provides UI actions to change app state.
 * And it contains reference for others domain stores.
 */
class AppStore {
	apiService;
	postStore;
	userStore;
	routes;
	@observable router = new RouterStore();
	@observable routeParams = {
		postId: 0,
		commentId: 0
	};

	constructor(apiService, postStore, userStore) {
		this.apiService = apiService;
		this.postStore = postStore;
		this.userStore = userStore;

		this.initializeRouter();

		autorun(() => {
			// Fallback to home page if url was not found.
			if (this.router.currentPath === '') {
				this.goToHome();
			}
		});
	}

	@action
	initializeRouter() {
		this.routes = Routes(this);
		startRouter(this.routes, this);
		this.setRouteParams(this.router.params);
	}

	@action
	setRouteParams = (params) => {
		this.routeParams.postId = parseInt(params.postId);
		this.routeParams.commentId = parseInt(params.commentId);
	}

	@action
	goToHome = () => {
		// Hardcoded home page.
		// There is not "landing page" yet.
		this.router.goTo(this.routes.postComments, {
			postId: 1
		});
		this.routeParams.postId = 1;
	}

	@action
	goToPostComments = (post) => {
		if (typeof post !== 'number') {
			post = this.currentPost;
		}
		this.router.goTo(this.routes.postComments, {
			postId: post.id
		});
	}

	@action
	goToCommentDetail = (comment) => {
		this.router.goTo(this.routes.commentDetail, {
			postId: comment.postId,
			commentId: comment.id
		})
	}

	@computed
	get isLoading() {
		return this.apiService.pendingRequests > 0;
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
		// TODO: dispose reactions.
	}
}

export default AppStore;
