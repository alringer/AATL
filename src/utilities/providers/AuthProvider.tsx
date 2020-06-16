import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IUserInformation } from 'store/user/user_types'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { login, logout } from '../../store/user/user_actions'

interface IReduxProps {
    login: (userInformation: IUserInformation) => void
    logout: () => void
}

interface IAuthProviderProps extends IReduxProps, IWithAuthInjectedProps {
    children: React.ReactChildren[]
}
const AuthProvider: React.FC<IAuthProviderProps> = ({ children, login, authenticated }) => {
    React.useEffect(() => {
        if (authenticated) {
            // TODO: Get the user information and set it to redux
            login({ userName: 'Jane Doe', userEmail: 'example@domain.com' })
        }
    }, [authenticated])
    return <>{children}</>
}

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            login,
            logout,
        },
        dispatch
    )

export default reduxConnect(null, mapDispatchToProps)(withAuth(AuthProvider))
