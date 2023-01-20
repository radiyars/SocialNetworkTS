import React from "react";
import { reduxForm } from "redux-form";
import { login } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { createField, Input } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../utils/validators/validators";
import { Navigate } from "react-router-dom";
import style from './../common/FormsControls/FormsControls.module.css';


const LoginForm = ({ handleSubmit, error }) => {
	return (
		<form onSubmit={handleSubmit} >
			{createField('Email', 'email', [required, maxLengthCreator(30)], Input)}
			{createField('Password', 'password', [required, maxLengthCreator(30)], Input, { type: 'password' })}
			{createField(null, 'rememberMe', [], Input, { type: 'checkbox' }, 'remember me')}

			{error && <div className={style.formSummaryError}>
				{error}
			</div>
			}
			<div>
				<button>Login</button>
			</div>
		</form>)
}


const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);


const Login = (props) => {
	const onSubmit = (formData) => {
		props.login(formData.email, formData.password, formData.rememberMe);
	}

	if (props.isAuth) {
		return <Navigate to={'/profile'} />
	}

	return <div>
		<h1>Login</h1>
		<LoginReduxForm onSubmit={onSubmit} />
	</div>
}


const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
})


// connect засовывает login не thunk а callback!!!
export default connect(mapStateToProps, { login })(Login);
