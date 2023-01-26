import { instance, ResponseType } from './api';


type MeResponseDataType = {
	id: number
	email: string
	login: string
}


type LoginResponseDataType = {
	userId: number
}


export const authAPI = {
	me() {
		return instance.get<ResponseType<MeResponseDataType>>(`auth/me`)
			.then(response => response.data);
	},

	login(email: string, password: string, rememberMe: boolean) {
		return instance.post<ResponseType<LoginResponseDataType>>(`auth/login`, { email, password, rememberMe })
			.then(response => response.data);
	},

	logout() {
		return instance.delete<ResponseType>(`auth/login`)
			.then(response => response.data);
	}

}


// authAPI.me().then((data) => data)
// 