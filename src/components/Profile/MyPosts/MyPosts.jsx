import React from 'react';
import style from './MyPosts.module.css'
import Post from './Post/Post'
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Tetxtarea } from '../../common/FormsControls/FormsControls';



function MyPosts(props) {

	let postsElements = props.profilePage.posts.map(post => <Post message={post.post} likesCount={post.likesCount} />)

	const addNewPost = (values) => {
		props.addPost(values.newPostText);
	}

	return (
		<div className={style.container}>

			<div>
				<AddNewPostRedux onSubmit={addNewPost} />
			</div>

			<div className={style.posts}>
				{postsElements}
			</div>
		</div>
	)

}


const AddNewPost = (props) => {
	return (
		<form onSubmit={props.handleSubmit} >
			<div>
				<Field placeholder={"your post text"} name={'newPostText'} component={Tetxtarea} validate={[required, maxLengthCreator(10)]} />
			</div>
			<div>
				<button>Add post</button>
			</div>
		</form>
	)
}

const AddNewPostRedux = reduxForm({ form: 'post' })(AddNewPost);



export default MyPosts
