import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './DialogItem.module.css';


type PropsType = {
	id: number
	name: string
}


const DialogItem: React.FC<PropsType> = ({ id, name }) => {
	return (
		<div className={styles.dialog + ' ' + styles.active}>
			<NavLink to={'/dialogs/' + id}>{name}</NavLink>
		</div>
	)
}

export default DialogItem
