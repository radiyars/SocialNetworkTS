import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logoPng from '../../assets/images/logo.svg'

type PropsType = {
	isAuth: boolean | null
	login: string | null
	logout: () => void
}

const Header: React.FC<PropsType> = ({ isAuth, logout, login }) => {
	return (
		<header className={styles.header}>
			<img src={logoPng} alt='logo' />

			<div className={styles.loginBlock}>
				{isAuth
					? <div>{login} <button onClick={logout}>Log out</button></div>
					: <div>
						<div>Email: free@samuraijs.com</div>
						<div>Password: free</div>
						<NavLink to={'/login'} >Login</NavLink>
					</div>}
			</div>
		</header>
	)
}

export default Header
