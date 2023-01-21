import axios from "axios";
import { ProfileType, UserType } from "../types/types";

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': 'c7b45913-93c3-498c-9d8d-dac7cb1512dc'
	}
});


// ------------------------------------------------------------------------------------------
// Список пользователей

type GetUsersResponseType = {
	items: Array<UserType>
	totalCount: number
	error: string
}

type FollowUnfollowResponseType = {
	data: {
	}
	resultCode: ResultCodesEnum
	messages: Array<string>
}


export const usersAPI = {

	getUsers(currentPage = 1, pageSize = 10) {
		return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => response.data);
	},

	unfollow(userId = 0) {
		return instance.delete<FollowUnfollowResponseType>(`follow/${userId}`)
			.then(response => response.data);
	},

	// у post должен быть еще один объект после url???
	follow(userId = 0) {
		return instance.post<FollowUnfollowResponseType>(`follow/${userId}`)
			.then(response => response.data);
	},

	getUserProfile(userId = 0) {
		console.warn('Obsolete methos. Please use profileAPI object.')
		return profileAPI.getUserProfile(userId);
	},

}

// ------------------------------------------------------------------------------------------
// Профил пользователя

type UpadeStatusResponseType = {
	data: {
	}
	resultCode: ResultCodesEnum
	messages: Array<string>
}


export const profileAPI = {

	getUserProfile(userId = 0) {
		return instance.get<ProfileType>(`profile/${userId}`)
			.then(response => response.data);
	},

	getStatus(userId = 0) {
		return instance.get(`profile/status/${userId}`)
			.then(response => response.data);
	},

	updateStatus(status: string) {
		return instance.put<UpadeStatusResponseType>(`profile/status`, { status: status })
			.then(response => response.data);
	}

}


// ------------------------------------------------------------------------------------------
// Авторизация

export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
}

type MeResponseType = {
	data: {
		id: number
		email: string
		login: string
	}
	resultCode: ResultCodesEnum
	messages: Array<string>
}


type LoginResponseType = {
	data: {
		userId: number
	}
	resultCode: ResultCodesEnum
	messages: Array<string>
}

type LogoutResponseType = {
	data: {
	}
	resultCode: ResultCodesEnum
	messages: Array<string>
}

export const authAPI = {
	me() {
		return instance.get<MeResponseType>(`auth/me`)
			.then(response => response.data);
	},

	login(email: string, password: string, rememberMe: boolean) {
		return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe })
			.then(response => response.data);
	},

	logout() {
		return instance.delete<LogoutResponseType>(`auth/login`)
			.then(response => response.data);
	}

}


// authAPI.me().then((data) => data)
// 