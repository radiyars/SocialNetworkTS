import { ProfileType } from "../types/types";
import { instance, ResponseType } from './api';

// ------------------------------------------------------------------------------------------
// Профил пользователя


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
		return instance.put<ResponseType>(`profile/status`, { status: status })
			.then(response => response.data);
	}

}

