import Cookies from 'js-cookie'

const AuthManager = () => {
    
    const authenticated = function() : boolean {
        return Cookies.get('X-AUTH-STATE') == 'true'
    }
    
    return {
        authenticated
    }
}

export default AuthManager()