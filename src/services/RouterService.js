import { matchPath } from 'react-router'

class RouterService {
	paths = {
		postComments: '/posts/:postId/comments',
		commentDetail: '/posts/:postId/comments/:commentId'
	};

	/**
	 * From a location, try to match with an existing route path.
	 * @param String locatiom
	 */
	getCurrentMatch(location) {
		return Object.keys(this.paths).map(key => {
			return matchPath(location, {
				path: this.paths[key],
				exact: true,
				strict: false
			})
		}).filter(match => match !== null).pop();
	}

	/**
	 * From a location, try to match with an existing route path
	 * and return the params.
	 * @param String location
	 */
	getRouteParams(location) {
		let match = this.getCurrentMatch(location);
		return (match !== undefined) ? match.params : {};
	}

	/*
	 * Inspired by: mobx-router.
	 * replaces url params placeholders with params from an object
	 * Example: if url is /book/:id/page/:pageId and object is {id:100, pageId:200} it will return /book/100/page/200
	 */
	getRoute(path, params) {
		let newPath = path;
		let paramRegex = /\/(:([^\/?]*)\??)/g;

		this.getRegexMatches(path, paramRegex, (results) => {
			let paramKey = results[1],
				paramKeyWithoutColon = results[2],
				value = params[paramKeyWithoutColon];

			newPath = value ? newPath.replace(paramKey, value) : newPath.replace(`/${paramKey}`, '');
		});

		return newPath;
	}

	getRegexMatches = (string, regexExpression, callback) => {
		let match;
		while ((match = regexExpression.exec(string)) !== null) {
			callback(match);
		}
	}
}

let singleton = new RouterService();
export default singleton;
