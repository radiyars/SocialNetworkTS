import React from "react";
import { UserType } from "../../types/types";
import Paginator from '../common/Paginator/Paginator';
import User from './User';

type PropsType = {
	currentPage: number
	pageSize: number
	isFetching: boolean
	totalUsersCount: number
	users: Array<UserType>
	followingInProgress: Array<Number>

	onPageChenged: (pageNumber: number) => void
	unfollow: (userId: number) => void
	follow: (userId: number) => void
}


let Users: React.FC<PropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChenged, users, ...props }) => {
	return (
		<div>
			<div>
				<Paginator
					currentPage={currentPage}
					onPageChenged={onPageChenged}
					totalUsersCount={totalUsersCount}
					pageSize={pageSize}
				/>
			</div>
			<div>
				{
					users.map(user => <User
						user={user}
						followingInProgress={props.followingInProgress}
						follow={props.follow}
						unfollow={props.unfollow}
						key={user.id}
					/>
					)
				}
			</div>
		</div >
	)
}

export default Users;