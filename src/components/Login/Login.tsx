import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { login } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { createField, Input } from "../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../utils/validators/validators";
import { Navigate } from "react-router-dom";
import style from './../common/FormsControls/FormsControls.module.css';
import { AppStateType } from "../../redux/redux-store";
// import { type } from "os";




const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> = ({ handleSubmit, error }) => {
	return (
		<form onSubmit={handleSubmit} >
			{createField('Email', 'email', [required, maxLengthCreator(30)], Input)}
			{createField('Password', 'password', [required, maxLengthCreator(30)], Input, { type: 'password' })}
			{createField(undefined, 'rememberMe', [], Input, { type: 'checkbox' }, 'remember me')}

			{error && <div className={style.formSummaryError}>
				{error}
			</div>
			}
			<div>
				<button>Login</button>
			</div>
		</form>)
}


const LoginReduxForm = reduxForm<LoginFormValuesType>({ form: 'login' })(LoginForm);


type MapStateToPropsType = {
	isAuth: boolean
}

type MapDispatchToPropsType = {
	login: (email: string, password: string, rememberMe: boolean) => void
}

type LoginFormValuesType = {
	email: string
	password: string
	rememberMe: boolean
}

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
	const onSubmit = (formData: any) => {
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


const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
	isAuth: state.auth.isAuth,
})


// connect засовывает login не thunk а callback!!!
export default connect(mapStateToProps, { login })(Login);
