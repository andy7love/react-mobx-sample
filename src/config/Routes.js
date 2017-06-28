import React from 'react';
import { Route } from 'mobx-router';

// Load views
import PostComments from '../views/PostComments';
import CommentDetail from '../views/CommentDetail';

export default {
	postComments: new Route({
		path: '/posts/:postId/comments',
		component: <PostComments />
	}),
	commentDetail: new Route({
		path: '/posts/:postId/comments/:commentId',
		component: <CommentDetail />
	})
};
