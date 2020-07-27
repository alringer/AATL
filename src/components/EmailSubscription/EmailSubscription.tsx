import Snackbar from 'components/Snackbar/Snackbar'
import axios, { SUBSCRIBE_MAILCHIMP } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { useSnackbar } from 'notistack'
import React from 'react'
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

const EmailSubscription = () => {
    const [email, setEmail] = React.useState('')
    const { enqueueSnackbar } = useSnackbar()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(String(e.target.value))
    }

    const handleSubscribe = () => {
        // TODO: Add more validations to check the validity of the input email
        if (email !== '') {
            // TODO: Call email subscription API
            console.log('TODO: Call subscribe API with ', email)
            const config = {}
            axios
                .post(SUBSCRIBE_MAILCHIMP, { emailAddress: email })
                .then((res) => {
                    console.log('Response from subscription: ', res)
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
                })
                .catch((err) => console.log(err))
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
                        placeholder={`${S.INPUT_PLACEHOLDERS.YourEmail}`}
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

export default EmailSubscription
