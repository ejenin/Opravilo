export interface ILayoutProps {
    children: JSX.Element
}

export interface IUserLayoutProps extends ILayoutProps {
    selectedMenu: 'home' | 'settings'
}