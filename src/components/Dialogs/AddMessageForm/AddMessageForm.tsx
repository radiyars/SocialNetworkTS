// @ts-ignore
import { Field, reduxForm } from "redux-form";
import { Tetxtarea } from "../../common/FormsControls/FormsControls";
import { maxLengthCreator, required } from './../../utils/validators/validators';




// @ts-ignore
const AddMessageForm = (props) => {
	return (
		// onSubmit - что должно выполниться когда форма засабмитится
		// handleSubmit - специальный метод. придет к нам из reduxForm
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field component={Tetxtarea} name='newMessageText' placeholder='Enter your message' validate={[required, maxLengthCreator(10)]} />
			</div>
			<div>
				<button>Send</button>
			</div>
		</form>
	)
}

const AddMessageFormRedux = reduxForm({ form: 'dialogaddMessageForm' })(AddMessageForm);


export default AddMessageFormRedux;