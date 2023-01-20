import React from 'react';
import styles from './Message.module.css';


type PropsType = {
	message: string
}


const Message: React.FC<PropsType> = ({ message }) => {
	return (
		<div className={styles.message}>{message}</div>
	)
}

export default Message
