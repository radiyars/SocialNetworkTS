

import { UserType } from './../types/types';
import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../components/utils/validators/object-helpers';
import { AppStateType } from './redux-store';
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


// --------------------------------------------------------------------------------------
// state по умолчанию
let initialState = {
	users: [] as Array<UserType>,
	pageSize: 5,
	totalUsersCount: 0,
	currentPage: 2,
	isFetching: false,
	followingInProgress: [] as Array<Number>, // array of users id
};

export type InitialStateType = typeof initialState;


// ---------------------------------------------------------------------------------------
// Reducer
const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {

		case FOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
			};

		case UNFOLLOW:

			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
			};

		case SET_USERS:
			return { ...state, users: action.users };

		case SET_CURRENT_PAGE:
			return { ...state, currentPage: action.currentPage };

		case SET_TOTAL_USERS_COUNT:
			return { ...state, totalUsersCount: action.totalUsersCount };

		case TOGGLE_IS_FETCHING:
			return { ...state, isFetching: action.isFetching };

		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					// пропускаем только ту Id, которая неравна той Id, которая пришла в action
					: state.followingInProgress.filter(id => id != action.userId)
			};

		default:
			return state;
	}
}


// ---------------------------------------------------------------------------------------
// ActionCreators

type ActionsTypes = FollowSuccsesActionType | UnfollowSuccesActionType | SetUsersActionType |
	SetCurrentPageActionType | SetTotalUsersCountActionType | ToggleIsFetchingActionType |
	ToggleFollowingProgressActionType;


type FollowSuccsesActionType = {
	type: typeof FOLLOW
	userId: number
}
// Подписаться на юзера
export const followSuccses = (userId: number): FollowSuccsesActionType => ({ type: FOLLOW, userId });


type UnfollowSuccesActionType = {
	type: typeof UNFOLLOW
	userId: number
}
// Отписаться от юзера
export const unfollowSucces = (userId: number): UnfollowSuccesActionType => ({ type: UNFOLLOW, userId });


type SetUsersActionType = {
	type: typeof SET_USERS
	users: Array<UserType>
}
// Получаем данные на юзеров
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });


type SetCurrentPageActionType = {
	type: typeof SET_CURRENT_PAGE
	currentPage: number
}
// Выбираем "порцию" юзеров
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage });


type SetTotalUsersCountActionType = {
	type: typeof SET_TOTAL_USERS_COUNT
	totalUsersCount: number
}
// Сетаем общее количество юзеров
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });


type ToggleIsFetchingActionType = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
// Определяем выводить рисунок загрузки или нет
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });


type ToggleFollowingProgressActionType = {
	type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
	isFetching: boolean
	userId: number
}

// Определяем блокировать кнопку FOLLOW или нет
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });



// ---------------------------------------------------------------------------------------
// Thunks

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
	dispatch(toggleIsFetching(true));
	dispatch(setCurrentPage(page));

	let response = await usersAPI.getUsers(page, pageSize);
	dispatch(toggleIsFetching(false));
	dispatch(setUsers(response.items));
	dispatch(setTotalUsersCount(response.totalCount));
};


const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => FollowSuccsesActionType | UnfollowSuccesActionType) => {
	dispatch(toggleFollowingProgress(true, userId));
	let response = await apiMethod(userId);
	if (response.resultCode == 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingProgress(false, userId));
}


export const follow = (userId: number): ThunkType => async (dispatch) => {
	_followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccses);
};


export const unfollow = (userId: number): ThunkType => async (dispatch) => {
	_followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSucces);
};


export default usersReducer;