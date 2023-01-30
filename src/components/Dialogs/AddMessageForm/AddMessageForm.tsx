// @ts-ignore
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Tetxtarea } from "../../common/FormsControls/FormsControls";
import { NewMessagwFormValuesType } from "../Dialogs";
import { required } from './../../utils/validators/validators';


export type NewMessagwFormValuesKeysType = Extract<keyof NewMessagwFormValuesType, string>;
type PropsType = {};

const AddMessageForm: React.FC<InjectedFormProps<NewMessagwFormValuesType, PropsType> & PropsType> = (props) => {

	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				{createField<NewMessagwFormValuesKeysType>('Enter your message', 'newMessageBody', [required], Tetxtarea)}
			</div>
			<div>
				<button>Send</button>
			</div>
		</form>
	)
}

const AddMessageFormRedux = reduxForm<NewMessagwFormValuesType>({ form: 'dialogaddMessageForm' })(AddMessageForm);


export default AddMessageFormRedux;