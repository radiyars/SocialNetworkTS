
import { stopSubmit } from 'redux-form';
import { authAPI, ResultCodesEnum } from '../api/api';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';


const SET_USER_DATA = 'auth/SET_USER_DATA';

// --------------------------------------------------------------------------------------
// state по умолчанию
let initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
}

export type InitialStateType = typeof initialState;


// ---------------------------------------------------------------------------------------
// Reducer

// ! --> action: any
const authReducer = (state = initialState, action: any): InitialStateType => {

	switch (action.type) {

		case SET_USER_DATA:
			return {
				...state,
				...action.payload,
				// userId: 'sdfs',
			}

		default:
			return state;

	}
}


// ---------------------------------------------------------------------------------------
// ActionCreators

type setAuthUserDataActionPayloadType = {
	userId: number | null
	email: string | null
	login: string | null
	isAuth: boolean | null
}

type setAuthUserDataActionType = {
	type: typeof SET_USER_DATA
	payload: setAuthUserDataActionPayloadType
}

// Устанавливаем данные пользователя
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
	type: SET_USER_DATA,
	payload: { userId, email, login, isAuth }
});

type ActionsTypes = setAuthUserDataActionType;


// ---------------------------------------------------------------------------------------
// Thunks

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

// Получаем данные пользователя
export const getAuthUserData = (): ThunkType => async (dispatch) => {
	let response = await authAPI.me();
	if (response.resultCode === ResultCodesEnum.Success) {
		let { id, email, login } = response.data;
		dispatch(setAuthUserData(id, email, login, true));
	}
};


// Залогиниться
export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch) => {
	let response = await authAPI.login(email, password, rememberMe);
	if (response.resultCode === ResultCodesEnum.Success) {
		dispatch(getAuthUserData());
	} else {
		let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
		// @ts-ignore
		dispatch(stopSubmit('login', { _error: message }));
	}
};


// Вылогиниться
export const logout = (): ThunkType => async (dispatch) => {
	let response = await authAPI.logout()
	if (response.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
};


export default authReducer;