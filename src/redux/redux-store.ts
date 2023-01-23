// import { createStore } from "redux";
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appReducer from './app-reducer';

// Отдаем редьюсеры редаксовскому стору
let rootReducer = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
});

type RootReducerType = typeof rootReducer; //(global:AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>;

// Создаем store. В нем уже имеются методы gerState, subcscribe, dispatch.
// Создает state, у которого внутри появляются свойства из reducers
let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// window.__store__ = store;

export default store;