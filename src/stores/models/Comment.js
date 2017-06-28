import { observable, action, runInAction } from 'mobx';

class Comment {
    /**
     * unique id of this comment, immutable.
     */
	id = null;

    /**
     * id of the post which this comment belongs, immutable.
     */
	postId = null;

    /**
     * reference to an User object (from the userStore)
     */
    @observable author = null;

    /**
     * message of the comment.
     */
    @observable body = null;

    /**
     * reference to the parent store.
     */
	store = null;

	constructor(store) {
		this.store = store;

        // TODO: Add reactions for 'autoSave' feature.
        // API does not support all CRUD operations yet.
	}

    /**
     * Update this comment with information from the server
     */
    @action
	updateFromJson(json) {
		runInAction(() => {
			this.postId = json.postId;
			this.id = json.id;
			this.body = json.body;
			this.author = this.store.userStore.resolveUserFromComment(json);
		});
	}

	dispose() {
        // TODO: clean reactions of 'autoSave' feature.
	}
}

export default Comment;
