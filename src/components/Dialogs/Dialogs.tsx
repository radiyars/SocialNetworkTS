import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import styles from './Dialogs.module.css';
import Message from './Message/Message';
import { DialogType, MessagesType } from '../../types/types';
import AddMessageFormRedux from './AddMessageForm/AddMessageForm';


type PropsType = {
	dialogs: Array<DialogType>
	messages: Array<MessagesType>
	addMessage: (newMessageText: string) => void
}

export type NewMessagwFormValuesType = { newMessageBody: string }

const Dialogs: React.FC<PropsType> = ({ dialogs, messages, addMessage }) => {
	let dialogsElements = dialogs.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />);
	let messagesElements = messages.map(message => <Message message={message.message} key={message.id} />);

	let addNewMessage = (values: NewMessagwFormValuesType) => {
		// свойства называются также как и name у Field
		addMessage(values.newMessageBody);
	}

	return (
		<div className={styles.dialogs}>
			<div className={styles.dialogsItems}>
				{dialogsElements}
			</div>
			<div className={styles.messages}>
				<div>{messagesElements}</div>

				<AddMessageFormRedux onSubmit={addNewMessage} />

			</div>
		</div>
	)
}



export default Dialogs;