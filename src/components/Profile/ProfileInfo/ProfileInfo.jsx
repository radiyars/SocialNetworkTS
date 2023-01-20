import style from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';


function ProfileInfo({ profile, status, updateStatus }) {
	if (!profile) {
		return <Preloader />
	} else {
		return (
			<div>
				<div className={style.descriptionContainer}>
					<img src={profile.photos.large} alt='#' />
					<ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
				</div>
			</div>
		)
	}
}

export default ProfileInfo;