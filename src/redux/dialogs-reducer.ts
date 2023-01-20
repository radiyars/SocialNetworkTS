import { DialogType, MessagesType } from './../types/types';
const ADD_MESSAGE = 'dialogs/ADD-MESSAGE';


// --------------------------------------------------------------------------------------
// state по умолчанию
let initialState = {
	dialogs: [
		{ id: 1, name: 'Radiy' },
		{ id: 2, name: 'Marina' },
		{ id: 3, name: 'Timur' },
		{ id: 4, name: 'Daniil' },
		{ id: 5, name: 'Babula' },
		{ id: 6, name: 'Dedula' },
	] as Array<DialogType>,

	messages: [
		{ id: 1, message: 'Hi' },
		{ id: 2, message: 'How is your React?' },
		{ id: 3, message: 'Yo!' },
		{ id: 4, message: 'Yo!' },
	] as Array<MessagesType>,

}

export type InitialStateType = typeof initialState;


// ---------------------------------------------------------------------------------------
// Reducer
const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

	switch (action.type) {

		case ADD_MESSAGE:
			let text = action.newMessageText;
			return {
				...state,
				messages: [...state.messages, { id: 5, message: text }],

			}

		default:
			return state;

	}
}

// ---------------------------------------------------------------------------------------
// ActionCreators

type addMessageActionType = {
	type: typeof ADD_MESSAGE
	newMessageText: string;
}

export const addMessage = (newMessageText: string): addMessageActionType => {
	return {
		type: ADD_MESSAGE,
		newMessageText,
	}
}

type ActionsTypes = addMessageActionType;


export default dialogsReducer;