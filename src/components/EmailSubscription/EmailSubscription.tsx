import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import axios, { SUBSCRIBE_MAILCHIMP } from 'config/AxiosConfig'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { useSnackbar } from 'notistack'
import React from 'react'
import { validateEmail } from 'utilities/helpers/validateEmail'
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
    const { enqueueSnackbar } = useSnackbar()

    const [email, setEmail] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(String(e.target.value))
    }

    const handleSubscribe = () => {
        const isValidEmail = validateEmail(email)
        const isEmpty = email === ''

        if (isValidEmail && !isEmpty) {
            const payload = {}
            setLoading(true)
            axios
                .post(SUBSCRIBE_MAILCHIMP(email), payload)
                .then((res) => {
                    setEmail('')
                    enqueueSnackbar('', {
                        content: (
                            <div>
                                <Snackbar
                                    type={B.EMAIL_SUBSCRIPTION.Type}
                                    title={B.EMAIL_SUBSCRIPTION.Title}
                                    message={<SnackbarMessageBody>{B.EMAIL_SUBSCRIPTION.Body}</SnackbarMessageBody>}
                                />
                            </div>
                        ),
                    })
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    setLoading(false)
                })
        } else if (isEmpty) {
            enqueueSnackbar('', {
                content: (
                    <div>
                        <Snackbar
                            type={B.ERROR_EMAIL_EMPTY.Type}
                            title={B.ERROR_EMAIL_EMPTY.Title}
                            message={<SnackbarMessageBody>{B.ERROR_EMAIL_EMPTY.Body}</SnackbarMessageBody>}
                        />
                    </div>
                ),
            })
        } else if (!isValidEmail) {
            enqueueSnackbar('', {
                content: (
                    <div>
                        <Snackbar
                            type={B.ERROR_EMAIL_INVALID.Type}
                            title={B.ERROR_EMAIL_INVALID.Title}
                            message={<SnackbarMessageBody>{B.ERROR_EMAIL_INVALID.Body}</SnackbarMessageBody>}
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
                        placeholder={`${S.INPUT_PLACEHOLDERS.YourEmail}`}
                        variant="outlined"
                    />
                    <EmailSubscriptionButtonContainer>
                        <EmailSubscriptionSubscribeButton onClick={handleSubscribe} disabled={isLoading}>
                            {S.BUTTON_LABELS.Subscribe}
                        </EmailSubscriptionSubscribeButton>
                    </EmailSubscriptionButtonContainer>
                </EmailSubscriptionFormContainer>
            </EmailSubscriptionRow>
        </EmailSubscriptionContainer>
    )
}

export default EmailSubscription
