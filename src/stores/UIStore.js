import { observable, computed, action, autorun } from 'mobx';
import { RouterStore, startRouter } from 'mobx-router';
import Routes from '../config/Routes';

/**
 * Store that represents the state of the app's user interface.
 * Also provides UI actions to change app state.
 */
class UIStore {
	apiService;
	@observable router = new RouterStore();
	@observable currentPost = null;

	constructor(apiService) {
		this.apiService = apiService;

		this.initializeRouter();

		autorun(() => {
			// Fallback to home page if url was not found.
			if(this.router.currentPath === '') {
				this.goToHome();
			}
		});
	}

	@action
	initializeRouter() {
		startRouter(Routes, this);
	}

	@action
	goToHome() {
		// Hardcoded home page.
		// There is not "landing page" yet.
		this.router.goTo(Routes.postComments, {
			postId: 1
		});
	}

	@action
	goToCommentDetail(comment) {
		this.router.goTo(Routes.commentDetail, {
			postId: comment.postId,
			commentId: comment.id
		})
	}

	@computed get isLoading() {
		return this.apiService.pendingRequests > 0;
	}

	dispose() {

	}
}

export default UIStore;
