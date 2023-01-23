
import React from 'react';
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import { FieldValidatorType } from '../../utils/validators/validators';
import styles from "./FormsControls.module.css";

type FormControlPropsType = {
	meta: WrappedFieldMetaProps,
	// ! у Димыча не было этой строки
	children: React.ReactNode
}


export const FormControl: React.FC<FormControlPropsType> = ({ meta: { touched, error }, children }) => {
	const hasError = touched && error;
	return (
		<div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
			<div>
				{children}
			</div>
			{hasError && <span>{error}</span>}
		</div>
	)
}



export const Tetxtarea: React.FC<WrappedFieldProps> = (props) => {
	const { input, meta, ...restProps } = props;
	return <FormControl {...props}><textarea {...input}{...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
	const { input, meta, ...restProps } = props;
	return <FormControl {...props}><input {...input}{...restProps} /></FormControl>
}


export const createField = (placeholder: string | undefined,
	name: string,
	validators: Array<FieldValidatorType>,
	component: React.FC<WrappedFieldProps>,
	props = {}, text = '') => (
	<div>
		<Field
			placeholder={placeholder}
			name={name}
			validate={validators}
			component={component}
			{...props}
		/>{text}
	</div>
)
