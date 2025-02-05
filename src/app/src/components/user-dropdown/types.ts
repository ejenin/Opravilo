export interface IUserDropdownProps {
    fetchDisplayName: () => void
    displayName?: string
    fetchingDisplayName: boolean
    onLogout: () => void
}