export interface FormProperties {
    username: string
    password: string
}

export interface ILoginFormProps {
    onLogin: (login: string, password: string) => void
    onVkLogin: (code: string) => void
    errors?: string[]
    loginSuccess: boolean
    fetching: boolean
}