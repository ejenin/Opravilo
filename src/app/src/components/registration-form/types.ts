export interface IFormProperties {
    username: string
    displayName: string
    password: string
}

export interface IRegistrationFormProps {
    onRegister: (login: string, password: string, displayName: string) => void
    errors?: string[]
    loginSuccess: boolean
    fetching: boolean
}