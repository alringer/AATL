import moment from 'moment'

export const getMomentFromNow = (inputDate: string) => {
    const formattedInputDate = moment(inputDate, false)
    const timeFromNow = formattedInputDate.fromNow()
    return timeFromNow
}
