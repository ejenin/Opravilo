export interface IUserState {
    displayName?: string
    
    fetching: boolean
    errors?: string[]
    registrationErrors?: string[]
}

export interface ITryLoginArgs {
    login: string
    password: string
}

export interface ITryRegisterArgs {
    login: string
    password: string
    displayName: string
}