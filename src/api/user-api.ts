import { UserType } from "../types/types";
import { instance, ResponseType } from './api';


type GetUsersResponseType = {
	items: Array<UserType>
	totalCount: number
	error: string
}

export const usersAPI = {

	getUsers(currentPage = 1, pageSize = 10) {
		return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => response.data);
	},

	unfollow(userId = 0) {
		return instance.delete<ResponseType>(`follow/${userId}`)
			.then(response => response.data);// as Promise<ResponseType>
	},

	// у post должен быть еще один объект после url???
	follow(userId = 0) {
		return instance.post<ResponseType>(`follow/${userId}`)
			.then(response => response.data);
	},

}

