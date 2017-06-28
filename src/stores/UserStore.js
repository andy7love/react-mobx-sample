import { observable, action } from 'mobx';
import User from './models/User';

/**
 * Store for the Users.
 */
class UserStore {
	apiService;
	@observable users = [];

	constructor(apiService) {
		this.apiService = apiService;
	}

	getUserByEmail = (email) => this.users.filter(user => user.email === email).pop();

    /**
     * Loading new user from comment data.
     * TODO: use API to get users when API support CRUD for users.
     */
	@action
	loadUser = (userData) => {
		let user = new User(this);
		user.updateFromJson(userData);
		this.users.push(user);
		return user;
	}

    /**
     * Resolving user from comment data.
     * TODO: use user ID when API start to support CRUD for users.
     */
	resolveUserFromComment(commentJson) {
		let user = this.getUserByEmail(commentJson.email);
		if (user !== undefined) {
			return user;
		} else {
			return this.loadUser(commentJson);
		}
	}
}

export default UserStore;
