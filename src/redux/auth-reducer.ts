
import { FormAction, stopSubmit } from 'redux-form';
import { ResultCodesEnum } from '../api/api';
import { authAPI } from '../api/auth-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';


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
const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

	switch (action.type) {

		case 'SN/AUTH/SET_USER_DATA':
			return {
				...state,
				...action.payload,
			}

		default:
			return state;

	}
}


// ---------------------------------------------------------------------------------------
// ActionCreators

export type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {

	// Устанавливаем данные пользователя
	setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
		type: 'SN/AUTH/SET_USER_DATA',
		payload: { userId, email, login, isAuth }
	} as const),
}


// ---------------------------------------------------------------------------------------
// Thunks

type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

// Получаем данные пользователя
export const getAuthUserData = (): ThunkType => async (dispatch) => {
	let response = await authAPI.me();
	if (response.resultCode === ResultCodesEnum.Success) {
		let { id, email, login } = response.data;
		dispatch(actions.setAuthUserData(id, email, login, true));
	}
};


// Залогиниться
export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch) => {
	let response = await authAPI.login(email, password, rememberMe);
	if (response.resultCode === ResultCodesEnum.Success) {
		dispatch(getAuthUserData());
	} else {
		let message = response.messages.length > 0 ? response.messages[0] : 'Some error';
		dispatch(stopSubmit('login', { _error: message }));
	}
};


// Вылогиниться
export const logout = (): ThunkType => async (dispatch) => {
	let response = await authAPI.logout()
	if (response.resultCode === 0) {
		dispatch(actions.setAuthUserData(null, null, null, false));
	}
};


export default authReducer;