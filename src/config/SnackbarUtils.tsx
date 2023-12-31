import { AxiosError } from 'axios'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import * as B from 'constants/SnackbarConstants'
import { useSnackbar, VariantType, WithSnackbarProps } from 'notistack'
import React from 'react'

interface IProps {
    setUseSnackbarRef: (showSnackbar: WithSnackbarProps) => void
}

const InnerSnackbarUtilsConfigurator: React.FC<IProps> = (props: IProps) => {
    props.setUseSnackbarRef(useSnackbar())
    return null
}

let useSnackbarRef: WithSnackbarProps
const setUseSnackbarRef = (useSnackbarRefProp: WithSnackbarProps) => {
    useSnackbarRef = useSnackbarRefProp
}

export const SnackbarUtilsConfigurator = () => {
    return <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />
}

export default {
    success(msg: string) {
        this.toast(msg, 'success')
    },
    warning(msg: string) {
        this.toast(msg, 'warning')
    },
    info(msg: string) {
        this.toast(msg, 'info')
    },
    error(error: AxiosError) {
        if (useSnackbarRef) {
            useSnackbarRef.enqueueSnackbar('', {
                content: (
                    <div>
                        <Snackbar
                            type={B.SNACKBAR_TYPES.Error}
                            title={
                                error && error.response && error.response.status
                                    ? `Status ${String(error.response.status)}`
                                    : 'Error'
                            }
                            message={<SnackbarMessageBody>{error.message}</SnackbarMessageBody>}
                        />
                    </div>
                ),
            })
        }
    },
    toast(msg: string, variant: VariantType = 'default') {
        if (useSnackbarRef) {
            useSnackbarRef.enqueueSnackbar(msg, { variant })
        }
    },
}
