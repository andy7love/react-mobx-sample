import { observable, action } from 'mobx';
import Comment from './Comment';

class Post {
    /**
     * unique id of this comment, immutable.
     */
	id = null;

    /**
     * array of Comments
     */
	@observable comments = [];

    /**
     * reference to the parent store.
     */
	store = null;

	constructor(store, id) {
		this.store = store;
		this.id = id;

		// TODO: Add reactions for 'autoSave' feature.
		// API does not support all CRUD operations yet.
	}

	getComment = (commentId) => this.comments.filter(comment => comment.id === parseInt(commentId)).pop();

    /**
     * Retrieve all comments of the post.
     */
	@action
	loadComments() {
		return this.store.apiService.fetchPostComments(this.id).then(fetchedComments => {
			fetchedComments.forEach(json => {
				let comment = new Comment(this.store);
				comment.updateFromJson(json);
				this.comments.push(comment);
			});
			return this.comments;
		});
	}

	dispose() {
		// TODO: clean reactions of 'autoSave' feature.
	}
}

export default Post;
