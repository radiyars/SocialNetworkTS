import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';


type PropsType = {
	isAuth: boolean | null
	login: string | null
	logout: () => void
}

const Header: React.FC<PropsType> = ({ isAuth, logout, login }) => {
	return (
		<header className={styles.header}>
			<img src='https://e7.pngegg.com/pngimages/356/636/png-clipart-logo-graphic-designer-business-online-and-offline-design-ring-orange.png' />

			<div className={styles.loginBlock}>
				{isAuth
					? <div>{login} - <button onClick={logout}>Log out</button></div>
					: <NavLink to={'/login'} >Login</NavLink>}
			</div>
		</header>
	)
}

export default Header
