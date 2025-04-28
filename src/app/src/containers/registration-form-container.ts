import {AppDispatch, AppState} from '../store/store'
import {IRegistrationFormProps, RegistrationForm} from '../components/registration-form'
import AuthManager from '../auth/AuthManager'
import {tryRegister} from '../store/user/thunks'
import {connect} from 'react-redux'

const mapStateToProps = (state: AppState) : Partial<IRegistrationFormProps> => ({
    errors: state.user.registrationErrors,
    loginSuccess: AuthManager.authenticated(),
    fetching: state.user.fetching
})

const mapDispatchToProps = (dispatch: AppDispatch) : Partial<IRegistrationFormProps> => ({
    onRegister: (login, password, displayName) => dispatch(tryRegister({login, password, displayName}))
})

export const RegistrationFormContainer = connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)