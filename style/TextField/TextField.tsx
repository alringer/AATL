// import { FormControl, InputLabel } from '@material-ui/core'
import { CustomTextField } from './TextField.style'

const TextField = (props) => {
    // const { label, ...rest } = props
    return (
        // <FormControl>
        //     <InputLabel>{label}</InputLabel>
        <CustomTextField {...props} />
        // {/* </FormControl> */}
    )
}

export default TextField
