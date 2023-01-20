import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";

let store = {

	// Непосредственно данные
	_state: {

		profilePage: {
			posts: [
				{ id: 1, post: 'Hi, how are you?', likesCount: 20 },
				{ id: 2, post: "It's my first post", likesCount: 100 },
			],
			newPostText: '',

		},

		dialogsPage: {
			dialogs: [
				{ id: 1, name: 'Radiy' },
				{ id: 2, name: 'Marina' },
				{ id: 3, name: 'Timur' },
				{ id: 4, name: 'Daniil' },
				{ id: 5, name: 'Babula' },
				{ id: 6, name: 'Dedula' },
			],

			messages: [
				{ id: 1, message: 'Hi' },
				{ id: 2, message: 'How is your React?' },
				{ id: 3, message: 'Yo!' },
				{ id: 4, message: 'Yo!' },
			],

			newMessageText: ''
		}
	},

	// 
	_callSubscriber() {
		console.log('State changed');
	},

	// "Подписчик" - следит за наблюдателем callback функцией
	subscribe(observer) {
		this._callSubscriber = observer; // паттерн observer
	},

	getState() {
		return this._state
	},

	// В зависимости от типа объекта action.type выполняем ту или иную callback функйию
	dispatch(action) {
		// Отдельный reducer для каждого подоьбъекта
		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
		this._callSubscriber(this._state);
	}
}

export default store
