import React from "react";
import { connect } from "react-redux";
import { follow, unfollow, requestUsers, actions, } from "../../redux/users-reducer";
// import { follow, setCurrentPage, unfollow, requestUsers, toggleFollowingProgress } from "../../redux/users-reducer";
import Users from './Users';
import Preloader from "../common/preloader/Preloader";
import { UserType } from "../../types/types";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getIsFetching, getUsers } from "../../redux/users-selectors";
import { AppStateType } from "../../redux/redux-store";


type MapStatePropsType = {
	currentPage: number
	pageSize: number
	pageNumber?: number
	isFetching: boolean
	totalUsersCount: number
	users: Array<UserType>
	followingInProgress: Array<Number>
}

type MapDispatchPropsType = {
	follow: (userId: number) => void
	unfollow: (userId: number) => void
	setCurrentPage: (pageNumber: number) => void
	toggleFollowingProgress: (isFetching: boolean, userId: number) => void
	getUsers: (currentPage: number, pageSize: number) => void
}

type OwnPropsType = {
	pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {

	// полсе того как компонента прорисовалась можно выполнить запрос на сервер
	componentDidMount() {
		const { currentPage, pageSize } = this.props;
		this.props.getUsers(currentPage, pageSize);
	}


	onPageChenged = (pageNumber: number) => {
		const { pageSize } = this.props;
		this.props.setCurrentPage(pageNumber);
		this.props.getUsers(pageNumber, pageSize);
	}


	render() {
		return <>
			<h2>{this.props.pageTitle}</h2>
			{this.props.isFetching ? <Preloader /> : null}
			<Users totalUsersCount={this.props.totalUsersCount}
				pageSize={this.props.pageSize}
				currentPage={this.props.currentPage}
				onPageChenged={this.onPageChenged}
				users={this.props.users}
				follow={this.props.follow}
				unfollow={this.props.unfollow}
				isFetching={this.props.isFetching}
				followingInProgress={this.props.followingInProgress}
			/>
		</>
	}
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state),
	}
}


// Создаем контейнерную компоненту
// connet сам вызовет mapStateToProps и сам передаст state. connect позволяет нам забыть про store.
export default
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
		mapStateToProps, {
		follow,
		unfollow,
		getUsers: requestUsers,
		...actions,
	})(UsersContainer);
