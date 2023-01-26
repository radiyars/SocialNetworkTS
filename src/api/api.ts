import axios from "axios";

export const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': 'c7b45913-93c3-498c-9d8d-dac7cb1512dc'
	}
});

export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
	data: D
	messages: Array<string>
	resultCode: RC
}
