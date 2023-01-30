import { connect } from 'react-redux';
import { actions } from '../../redux/dialogs-reducer';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { compose } from 'redux';
import { DialogType, MessagesType } from '../../types/types'
import { AppStateType } from '../../redux/redux-store';
import Dialogs from './Dialogs';


type MapStatePropsType = {
	dialogs: Array<DialogType>
	messages: Array<MessagesType>
}

type MapDispatchPropsType = {
	addMessage: (newMessageText: string) => void
}

type OwnPropsType = {
	pageTitle: string
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		dialogs: state.dialogsPage.dialogs,
		messages: state.dialogsPage.messages,
	}
}


export default compose<React.Component>(
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
		mapStateToProps, { ...actions }),
	withAuthNavigate
)(Dialogs);

