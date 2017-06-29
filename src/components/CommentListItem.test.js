import React from 'react';
import { render } from 'enzyme';
import Comment from '../stores/models/Comment';
import User from '../stores/models/User';
import CommentListItem from './CommentListItem';
import { observable } from 'mobx';

describe('components/CommentListItem', () => {
	let fakeStore = observable({});
	let comment;
	let component;

	describe('when displaying a comment', () => {
		beforeEach(() => {
			comment = new Comment();
			comment.id = 1;
			comment.postId = 1;
			comment.body = 'Lorem ipsum';
			comment.author = new User();
			comment.author.email = 'test@domain.com';
			comment.author.name = 'John Doe';
			component = render(<CommentListItem comment={comment} store={fakeStore} />);
		});

		it('should show correct author name', () => {
			expect(component.find('.header').text()).toEqual(comment.author.name);
		});

		it('should show correct author email', () => {
			expect(component.find('.meta').text()).toEqual(comment.author.email);
		});

		it('should show correct body', () => {
			expect(component.find('.description').text()).toEqual(comment.body);
		});
	});
});
