import { getAuthUserData } from './auth-reducer';
import { BaseThunkType, InferActionsTypes } from './redux-store';


// ---------------------------------------------------------------------------------------
// State

// state по умолчанию
let initialState = {
	initialized: false,
}

export type InitialStateType = typeof initialState;


// ---------------------------------------------------------------------------------------
// Reducer

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

	switch (action.type) {

		case 'SN/APP/INITIALIZED_SUCCESS':
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


type ActionsTypes = InferActionsTypes<typeof actions>;

const actions = {
	// Инициализация успешна
	initializedSuccess: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS' } as const),

}


// ---------------------------------------------------------------------------------------
// Thunks

type ThunkType = BaseThunkType<ActionsTypes>;

// Получаем данные пользователя
// ! --> dispatch: any
export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(getAuthUserData());

	Promise.all([promise])
		.then(() => {
			dispatch(actions.initializedSuccess());
		})
}


export default appReducer;