import {AppDispatch, AppState} from '../store/store'
import {connect} from 'react-redux'
import {ILoginFormProps, LoginForm} from '../components/login-form'
import {tryLogin, tryVkLogin} from '../store/user/thunks'
import AuthManager from '../auth/AuthManager'

const mapStateToProps = (state: AppState) : Partial<ILoginFormProps> => ({
    errors: state.user.errors,
    loginSuccess: AuthManager.authenticated(),
    fetching: state.user.fetching
})

const mapDispatchToProps = (dispatch: AppDispatch) : Partial<ILoginFormProps> => ({
    onLogin: (login, password) => dispatch(tryLogin({login, password})),
    onVkLogin: (code) => dispatch(tryVkLogin(code))
})

export const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm)