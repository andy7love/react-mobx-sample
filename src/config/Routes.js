import React from 'react';
import { Route } from 'mobx-router';

// Load views
import PostComments from '../views/PostComments';
import CommentDetail from '../views/CommentDetail';

export default (store) => {
	return {
		postComments: new Route({
			path: '/posts/:postId/comments',
			component: <PostComments />,
			onParamsChange: (route, params) => {
				store.setRouteParams(params);
			}
		}),
		commentDetail: new Route({
			path: '/posts/:postId/comments/:commentId',
			component: <CommentDetail />,
			onParamsChange: (route, params) => {
				store.setRouteParams(params);
			}
		})
	};
};
