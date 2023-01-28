import { connect } from 'react-redux';
import { actions } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';


let mapStateToProps = (state) => {
	return {
		profilePage: state.profilePage,
	}
}


const MyPostsContainer = connect(mapStateToProps, { ...actions })(MyPosts);

export default MyPostsContainer
