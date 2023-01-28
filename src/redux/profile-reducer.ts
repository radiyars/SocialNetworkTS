import { ThunkAction } from 'redux-thunk';
import { ResultCodesEnum } from '../api/api';
import { profileAPI } from './../api/profile-api';
import { PostsType, ProfileType } from './../types/types';
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store';



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

		case 'SN/PROFILE-REDUCER/ADD_POST': {
			let post = action.newPostText;
			return {
				...state,
				posts: [...state.posts, { id: 3, post: post, likesCount: 5 }],
			}
		}

		case 'SN/PROFILE-REDUCER/SET_USER_PROFILE': {
			return { ...state, profile: action.profile }
		}

		case 'SN/PROFILE-REDUCER/SET_STATUS': {
			return {
				...state,
				status: action.status
			}
		}

		case 'SN/PROFILE-REDUCER/DELETE_POST': {
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

export type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
	addPost: (newPostText: string) => ({ type: 'SN/PROFILE-REDUCER/ADD_POST', newPostText } as const),
	setUserProfile: (profile: ProfileType) => ({ type: 'SN/PROFILE-REDUCER/SET_USER_PROFILE', profile } as const),
	setStatus: (status: string) => ({ type: 'SN/PROFILE-REDUCER/SET_STATUS', status } as const),
	deletePost: (postId: number) => ({ type: 'SN/PROFILE-REDUCER/DELETE_POST', postId } as const),
}



// ---------------------------------------------------------------------------------------
// Thunks

type ThunkType = BaseThunkType<ActionsTypes>;


export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
	let response = await profileAPI.getUserProfile(userId);
	dispatch(actions.setUserProfile(response));
};


export const getStatus = (userId: number): ThunkType => async (dispatch) => {
	let response = await profileAPI.getStatus(userId);
	dispatch(actions.setStatus(response));
};


export const updateStatus = (status: string): ThunkType => async (dispatch) => {
	let response = await profileAPI.updateStatus(status)
	if (response.resultCode === ResultCodesEnum.Success) {
		dispatch(actions.setStatus(status));
	}
};


export default profileReducer;