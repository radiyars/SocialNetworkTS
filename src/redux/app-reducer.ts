import { getAuthUserData } from './auth-reducer';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './redux-store';

const INITIALIZED_SUCCESS = '/INITIALIZED_SUCCESS';


// ---------------------------------------------------------------------------------------
// State
export type initialStateType = {
	initialized: boolean,
}

// state по умолчанию
let initialState: initialStateType = {
	initialized: false,
}


// ---------------------------------------------------------------------------------------
// Reducer

const appReducer = (state = initialState, action: ActionsTypes): initialStateType => {

	switch (action.type) {

		case INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true,
			}

		default:
			return state;

	}
}


// ---------------------------------------------------------------------------------------
// ActionCreators


type initializedSuccessActionType = {
	type: typeof INITIALIZED_SUCCESS
}
// Инициализация успешна
export const initializedSuccess = (): initializedSuccessActionType => ({ type: INITIALIZED_SUCCESS });

type ActionsTypes = initializedSuccessActionType;


// ---------------------------------------------------------------------------------------
// Thunks

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

// Получаем данные пользователя
// ! --> dispatch: any
export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(getAuthUserData());

	Promise.all([promise])
		.then(() => {
			dispatch(initializedSuccess());
		})
}


export default appReducer;