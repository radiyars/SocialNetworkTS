import axios from "axios";

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': 'c7b45913-93c3-498c-9d8d-dac7cb1512dc'
	}
});

export const usersAPI = {

	getUsers(currentPage = 1, pageSize = 10) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => response.data);
	},

	unfollow(userId = 0) {
		return instance.delete(`follow/${userId}`)
			.then(response => response.data);
	},

	// у post должен быть еще один объект после url???
	follow(userId = 0) {
		return instance.post(`follow/${userId}`)
			.then(response => response.data);
	},



	getUserProfile(userId = 0) {
		console.warn('Obsolete methos. Please use profileAPI object.')
		return profileAPI.getUserProfile(userId);
	},

}

export const profileAPI = {

	getUserProfile(userId = 0) {
		return instance.get(`profile/${userId}`)
			.then(response => response.data);
	},

	getStatus(userId = 0) {
		return instance.get(`profile/status/${userId}`)
			.then(response => response.data);
	},

	updateStatus(status) {
		return instance.put(`profile/status`, { status: status })
			.then(response => response.data);
	}

}


export const authAPI = {
	me() {
		return instance.get(`auth/me`)
			.then(response => response.data);
	},

	login(email, password, rememberMe) {
		return instance.post(`auth/login`, { email, password, rememberMe })
			.then(response => response.data);
	},

	logout() {
		return instance.delete(`auth/login`)
			.then(response => response.data);
	}

}



