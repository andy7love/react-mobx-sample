import { observable, action, runInAction } from 'mobx';

class User {
    /**
     * user name.
     */
	@observable name = null;

    /**
     * user email.
     */
	@observable email = null;

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
     * Update this user with information from the server
     */
	@action
	updateFromJson(json) {
		runInAction(() => {
			this.name = json.name;
			this.email = json.email;
		});
	}

	dispose() {
		// TODO: clean reactions of 'autoSave' feature.
	}
}

export default User;
