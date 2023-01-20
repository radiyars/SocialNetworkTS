export type PostsType = {
	id: number
	post: string
	likesCount: number
}

export type ContactsType = {
	github: string
	vk: string
	facebook: string
	instagram: string
	twitter: string
	website: string
	youtube: string
	mainLink: string
}

export type PhotosType = {
	small: string | null
	large: string | null
}

export type ProfileType = {
	userId: number
	lookingForAJob: boolean
	lookingForAJobDescription: string
	fullName: string
	contacts: ContactsType
	photos: PhotosType
}

export type UserType = {
	id: number
	name: string
	status: string
	photos: PhotosType
	followed: boolean
}

export type DialogType = {
	id: number
	name: string
}

export type MessagesType = {
	id: number
	message: string
}