import {AppDispatch, AppState} from '../store/store'
import {IUserDropdownProps, UserDropdown} from '../components/user-dropdown'
import {onLogout, fetchUserInfo} from '../store/user/thunks'
import {connect} from 'react-redux'

const mapStateToProps = (state: AppState) : Partial<IUserDropdownProps> => ({
    displayName: state.user.displayName,
    fetchingDisplayName: state.user.fetching
})

const mapDispatchToProps = (dispatch: AppDispatch) : Partial<IUserDropdownProps> => ({
    onLogout: () => dispatch(onLogout()),
    fetchDisplayName: () => dispatch(fetchUserInfo())
})

export const UserDropdownContainer = connect(mapStateToProps, mapDispatchToProps)(UserDropdown)