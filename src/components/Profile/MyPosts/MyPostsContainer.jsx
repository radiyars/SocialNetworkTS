import { connect } from 'react-redux';
import { addPost } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';


let mapStateToProps = (state) => {
	return {
		profilePage: state.profilePage,
	}
}


const MyPostsContainer = connect(mapStateToProps, { addPost, })(MyPosts);

export default MyPostsContainer
