import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'
import { Subtract } from 'utility-types'

export interface IReduxProps {
    venuesInLists: number[]
    venuesRecommended: number[]
    venuesPrompted: number[]
}

export interface IWithCallToActionInjectedProps {
    placeToShowID: number
}

const withCallToAction = <P extends IWithCallToActionInjectedProps>(Component: React.ComponentType<P>) => {
    const mapStateToProps = (state: StoreState) => ({
        venuesInLists: state.userReducer.venuesListsVenueIDs,
        venuesRecommended: state.userReducer.venuesRecommendedVenueIDs,
        venuesPrompted: state.userReducer.venuesRecommendationPromptsVenueIDs,
    })

    const EnhancedComponent: React.FC<Subtract<P, IWithCallToActionInjectedProps>> = reduxConnect(mapStateToProps)(
        (props: any) => {
            const [placeToShowID, setPlaceToShowID] = React.useState<number>(-1)
            const { venuesInLists, venuesRecommended, venuesPrompted, ...passProps } = props

            React.useEffect(() => {
                const newCandidates = venuesInLists
                    .filter((venueID: number) => !venuesRecommended.includes(venueID))
                    .filter((venueID: number) => !venuesPrompted.includes(venueID))
                setPlaceToShowID(newCandidates.length > 0 ? newCandidates[0] : -1)
            }, [venuesInLists, venuesRecommended, venuesPrompted])
            return <Component {...(passProps as P)} placeToShowID={placeToShowID} />
        }
    )
    return (props) => <EnhancedComponent {...props} />
}

export default withCallToAction
