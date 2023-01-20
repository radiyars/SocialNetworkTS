import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getStatus, updateStatus } from '../../redux/profile-reducer';
import { useLocation, useNavigate, useParams, } from "react-router-dom";
import { withAuthNavigate } from './../../hoc/withAuthNavigate';
import { compose } from 'redux';

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return (
			<Component
				{...props}
				router={{ location, navigate, params }}
			/>
		);
	}

	return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component {

	componentDidMount() {

		let userId = this.props.router.params.userId;
		if (!userId) {
			userId = this.props.authorisedUserId;
		}
		this.props.getUserProfile(userId);
		this.props.getStatus(userId);

	}

	render() {

		return (
			// Контейнерная компонента должна отправить в дочернюю все что в нее приходит.
			<Profile {...this.props}
				profile={this.props.profile}
				status={this.props.status}
				updateStatus={this.props.updateStatus} />
			// (если записать props=this.props то в дочерней компоненте будет props.props)
		)
	}
}


let mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorisedUserId: state.auth.userId,
	isAuth: state.auth.isAuth,
});


export default compose(
	connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
	withRouter,
	withAuthNavigate
)(ProfileContainer);

