

import { UserType } from './../types/types';
import { usersAPI } from '../api/users-api';
import { updateObjectInArray } from '../components/utils/validators/object-helpers';
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store';
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';


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

		case 'FOLLOW':
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
			};

		case 'UNFOLLOW':

			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
			};

		case 'SET_USERS':
			return { ...state, users: action.users };

		case 'SET_CURRENT_PAGE':
			return { ...state, currentPage: action.currentPage };

		case 'SET_TOTAL_USERS_COUNT':
			return { ...state, totalUsersCount: action.totalUsersCount };

		case 'TOGGLE_IS_FETCHING':
			return { ...state, isFetching: action.isFetching };

		case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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

export type ActionsTypes = InferActionsTypes<typeof actions>;


export const actions = {

	// Подписаться на юзера
	followSuccses: (userId: number) => ({ type: 'FOLLOW', userId } as const),

	// Отписаться от юзера
	unfollowSucces: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),

	// Получаем данные на юзеров
	setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),

	// Выбираем "порцию" юзеров
	setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),

	// Сетаем общее количество юзеров
	setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalUsersCount } as const),

	// Определяем выводить рисунок загрузки или нет
	toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),

	// Определяем блокировать кнопку FOLLOW или нет
	toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const),

}

// ---------------------------------------------------------------------------------------
// Thunks

type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = BaseThunkType<ActionsTypes>;


export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
	dispatch(actions.toggleIsFetching(true));
	dispatch(actions.setCurrentPage(page));

	let response = await usersAPI.getUsers(page, pageSize);
	dispatch(actions.toggleIsFetching(false));
	dispatch(actions.setUsers(response.items));
	dispatch(actions.setTotalUsersCount(response.totalCount));
};


const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
	dispatch(actions.toggleFollowingProgress(true, userId));
	let response = await apiMethod(userId);
	if (response.resultCode == 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(actions.toggleFollowingProgress(false, userId));
}


export const follow = (userId: number): ThunkType => async (dispatch) => {
	_followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccses);
};


export const unfollow = (userId: number): ThunkType => async (dispatch) => {
	_followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSucces);
};


export default usersReducer;