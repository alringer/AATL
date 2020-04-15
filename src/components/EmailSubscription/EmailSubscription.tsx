import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { withSnackbar } from 'notistack'
import React from 'react'
import Snackbar from '../Snackbar/Snackbar'
import {
    EmailSubscriptionBody,
    EmailSubscriptionButtonContainer,
    EmailSubscriptionContainer,
    EmailSubscriptionFormContainer,
    EmailSubscriptionRow,
    EmailSubscriptionSubscribeButton,
    EmailSubscriptionTextContainer,
    EmailSubscriptionTextInput,
    EmailSubscriptionTitle,
} from './EmailSubscription.style'

const EmailSubscription = ({ enqueueSnackbar }) => {
    const [email, setEmail] = React.useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(String(e.target.value))
    }

    const handleSubscribe = () => {
        // TODO: Add more validations to check the validity of the input email
        if (email !== '') {
            // TODO: Call email subscription API
            console.log('TODO: Call subscribe API with ', email)
            setEmail('')
            // TODO: Enqueue snackbar if the API returns with success
            enqueueSnackbar('', {
                content: (
                    <div>
                        <Snackbar
                            type={B.EMAIL_SUBSCRIPTION.Type}
                            title={B.EMAIL_SUBSCRIPTION.Title}
                            message={B.EMAIL_SUBSCRIPTION.Body}
                        />
                    </div>
                ),
            })
        }
    }

    return (
        <EmailSubscriptionContainer>
            <EmailSubscriptionRow>
                <EmailSubscriptionTextContainer>
                    <EmailSubscriptionTitle>{S.EMAIL_SUBSCRIPTION.Title}</EmailSubscriptionTitle>
                </EmailSubscriptionTextContainer>
            </EmailSubscriptionRow>
            <EmailSubscriptionRow id="marginTop">
                <EmailSubscriptionTextContainer>
                    <EmailSubscriptionBody>{S.EMAIL_SUBSCRIPTION.Body}</EmailSubscriptionBody>
                </EmailSubscriptionTextContainer>
                <EmailSubscriptionFormContainer>
                    <EmailSubscriptionTextInput
                        value={email}
                        onChange={handleChange}
                        placeholder={`${S.BUTTON_PLACEHOLDERS.YourEmail}`}
                        variant="outlined"
                    />
                    <EmailSubscriptionButtonContainer>
                        <EmailSubscriptionSubscribeButton onClick={handleSubscribe}>
                            {S.BUTTON_LABELS.Subscribe}
                        </EmailSubscriptionSubscribeButton>
                    </EmailSubscriptionButtonContainer>
                </EmailSubscriptionFormContainer>
            </EmailSubscriptionRow>
        </EmailSubscriptionContainer>
    )
}

export default withSnackbar(EmailSubscription)
