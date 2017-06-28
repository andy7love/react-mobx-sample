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
	@observable router = new RouterStore();
	@observable currentCommentId = 0;

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
	setCurrentCommentId = (id) => {
		this.currentCommentId = id;
	}

	@action
	initializeRouter() {
		startRouter(Routes, this);
	}

	@action
	goToHome = () => {
		// Hardcoded home page.
		// There is not "landing page" yet.
		this.router.goTo(Routes.postComments, {
			postId: 1
		});
	}

	@action
	goToPostComments = (post) => {
		if (typeof post !== 'number') {
			post = this.currentPost;
		}
		this.router.goTo(Routes.postComments, {
			postId: post.id
		});
	}

	@action
	goToCommentDetail = (comment) => {
		this.router.goTo(Routes.commentDetail, {
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
		if (!this.router.params.postId ||
			this.isLoading ||
			this.postStore.posts.length === 0) {
			return undefined;
		}

		return this.postStore.getPost(this.router.params.postId);
	}

	@computed
	get currentComment() {
		if (parseInt(this.router.params.commentId) === 0 ||
			this.isLoading ||
			this.currentPost === undefined) {
			return undefined;
		}

		return this.currentPost.getComment(this.router.params.commentId);
	}

	dispose() {
		// TODO: dispose reactions.
	}
}

export default AppStore;
