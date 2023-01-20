import profileReducer, { addPost, deletePost } from "./profileReducer";


let state = {
	posts: [
		{ id: 1, post: 'Hi, how are you?', likesCount: 20 },
		{ id: 2, post: "It's my first post", likesCount: 100 },
	],

	newPostText: '',
}


test('length of posts should be incremented', () => {

	// 1. test data
	let action = addPost('you are pretty good!');

	// 2. action
	let newState = profileReducer(state, action);

	// 3. expectation
	expect(newState.posts.length).toBe(3);
});


test('message of new post should be correct', () => {

	// 1. test data
	let action = addPost('you are pretty good!');

	// 2. action
	let newState = profileReducer(state, action);

	// 3. expectation
	expect(newState.posts[2].post).toBe('you are pretty good!');
});


test('after deleting length of messages should be decrement', () => {

	// 1. test data
	let action = deletePost(2);

	// 2. action
	let newState = profileReducer(state, action);

	// 3. expectation
	expect(newState.posts.length).toBe(1);
});


test('after deleting length should`nt be decrement if id is incorrect', () => {

	// 1. test data
	let action = deletePost(1000);

	// 2. action
	let newState = profileReducer(state, action);

	// 3. expectation
	expect(newState.posts.length).toBe(2);
});