import { ProfileType, PostsType } from './../types/types';
import { usersAPI, profileAPI, ResultCodesEnum } from '../api/api';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';


// ---------------------------------------------------------------------------------------

// state по умолчанию
let initialState = {
	posts: [
		{ id: 1, post: 'Hi, how are you?', likesCount: 20 },
		{ id: 2, post: "It's my first post", likesCount: 100 },
	] as Array<PostsType>,
	newPostText: '',
	profile: null as ProfileType | null,
	status: '',
}

export type InitialStateType = typeof initialState;


// ---------------------------------------------------------------------------------------
// Reducer

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {

		case ADD_POST: {
			let post = action.newPostText;
			return {
				...state,
				posts: [...state.posts, { id: 3, post: post, likesCount: 5 }],
			}
		}

		case SET_USER_PROFILE: {
			return { ...state, profile: action.profile }
		}

		case SET_STATUS: {
			return {
				...state,
				status: action.status
			}
		}

		case DELETE_POST: {
			return {
				...state,
				posts: state.posts.filter(p => p.id != action.postId)
			}
		}

		default:
			return state;

	}

}


// ---------------------------------------------------------------------------------------
// ActionCreators

type ActionsTypes = AddPostActionType | SetUserProfileActionType |
	SetStatusActionType | DeletePostActionType;


type AddPostActionType = {
	type: typeof ADD_POST
	newPostText: string
}
export const addPost = (newPostText: string): AddPostActionType => ({ type: ADD_POST, newPostText });


type SetUserProfileActionType = {
	type: typeof SET_USER_PROFILE
	profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });


type SetStatusActionType = {
	type: typeof SET_STATUS
	status: string
}
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status });

type DeletePostActionType = {
	type: typeof DELETE_POST
	postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId });


// ---------------------------------------------------------------------------------------
// Thunks

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export const getUserProfile = (userId: number): ThunkType => async (dispatch: any) => {
	let response = await usersAPI.getUserProfile(userId);
	dispatch(setUserProfile(response));
};


export const getStatus = (userId: number): ThunkType => async (dispatch: any) => {
	let response = await profileAPI.getStatus(userId);
	dispatch(setStatus(response));
};


export const updateStatus = (status: string): ThunkType => async (dispatch: any) => {
	let response = await profileAPI.updateStatus(status)
	if (response.resultCode === ResultCodesEnum.Success) {
		dispatch(setStatus(status));
	}
};


export default profileReducer;