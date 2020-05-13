import { Link } from '@material-ui/core'
import React from 'react'
import Image from '../Image/Image'
import {
    SnackbarContainer,
    SnackbarImageContainer,
    SnackbarMessageBody,
    SnackbarMessageContainer,
    SnackbarMessageLink,
    SnackbarMessageTitle,
} from './Snackbar.style'

interface ISnackbarProps {
    type: string
    title: string
    message: string
    iconPath?: string
    linkMessage?: string
    linkDestination?: string
}

const Snackbar: React.FC<ISnackbarProps> = ({ type, iconPath, title, message, linkMessage, linkDestination }) => {
    // Snackbar Full Props Example:
    // enqueueSnackbar('', {
    //     content: (
    //         <div>
    //             <Snackbar
    //                 type={B.SNACKBAR_TYPES.Achievement}
    //                 title={B.EMAIL_SUBSCRIPTION.Title}
    //                 message={B.EMAIL_SUBSCRIPTION.Body}
    //                 iconPath={ExampleSVG}
    //                 linkMessage={B.EMAIL_SUBSCRIPTION.LinkMessage}
    //                 linkDestination={B.EMAIL_SUBSCRIPTION.LinkDestination}
    //             />
    //         </div>
    //     ),
    // })

    return (
        <SnackbarContainer id={type}>
            {iconPath && (
                <SnackbarImageContainer>
                    <Image src={iconPath} alt="snackbar-icon" />
                </SnackbarImageContainer>
            )}
            <SnackbarMessageContainer>
                <SnackbarMessageTitle>{title}</SnackbarMessageTitle>
                <SnackbarMessageBody>{message}</SnackbarMessageBody>
                {linkMessage && linkDestination && (
                    <Link href={linkDestination}>
                        <SnackbarMessageLink>{linkMessage}</SnackbarMessageLink>
                    </Link>
                )}
            </SnackbarMessageContainer>
        </SnackbarContainer>
    )
}

export default Snackbar
