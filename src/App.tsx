import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Preloader from './components/common/preloader/Preloader';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp } from './redux/app-reducer';
import { AppStateType } from './redux/redux-store';


type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
	initializeApp: () => void
};


class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {

	componentDidMount() {
		this.props.initializeApp();
	}

	render() {
		if (!this.props.initialized) {
			return <Preloader />
		}

		return (
			<BrowserRouter>
				<div className='app-wrapper'>
					<HeaderContainer />
					<Navbar />
					<div className='app-wrapper-content'>
						<Routes>
							{/* РЎ РїРѕРјРѕС€СЊСЋ Route СЃР»РµРґРёРј Р·Р° Р°РґСЂРµСЃРЅРѕР№ СЃС‚СЂРѕРєРѕР№, Рё РµСЃР»Рё Р°РґСЂРµСЃ СЃРѕРІРїР°РґР°РµС‚ СЃ path РїСЂРѕСЂРёСЃРѕРІС‹РІР°РµРј РЅР°С€Сѓ РєРѕРјРїРѕРЅРµРЅС‚Сѓ */}
							<Route path='/profile/:userId' element={<ProfileContainer />} />
							<Route path='/profile/' element={<ProfileContainer />} />
							<Route path='/dialogs/*' element={<DialogsContainer />} />
							<Route path='/users/' element={<UsersContainer />} />
							<Route path='/login' element={<Login />} />


						</Routes>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

let mapStateToProps = (state: AppStateType) => ({
	initialized: state.app.initialized,
})

export default connect(mapStateToProps, { initializeApp })(App);
