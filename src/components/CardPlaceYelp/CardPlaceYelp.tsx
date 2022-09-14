import Grow from '@material-ui/core/Grow'
import ExpandSVG from 'assets/expand-icon.svg'
import CloseSVG from 'assets/mushroomOutlineClose.svg'
import { default as Image } from 'components/Image/Image'
import { IYelpRestaurant } from 'components/SearchModal/SearchRestaurant'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { openListModal } from 'store/listModal/listModal_actions'
import { OpenListModalPayload } from 'store/listModal/listModal_types'
import { openRecommendationModal } from 'store/recommendationModal/recommendationModal_actions'
import {
    RecommendationModalPlaceInformation,
    RecommendationModalType,
} from 'store/recommendationModal/recommendationModal_types'
import { CardIcon, WideHeaderContentContainer, WidePlaceAddressText } from 'style/Card/Card.style'
import { DeviceNameEnum, size } from 'style/device'
import { addCommaToStreet } from 'utilities/helpers/addCommaToStreet'
import { chopStringPlaceCategories, chopStringPlaceName } from 'utilities/helpers/chopString'
import { concatCategories } from 'utilities/helpers/concatStrings'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import useWindowSize from 'utilities/hooks/useWindowSize'
import { ICategory } from 'utilities/types/category'
import { IVenue } from 'utilities/types/venue'
import {
    CardPlaceWideAuthorNameText,
    CardPlaceWideAuthorTitleText,
    CardPlaceWideCardContainer,
    CardPlaceWideCardContentContainer,
    CardPlaceWideCardImageContainer,
    CardPlaceWideContentBottomContainer,
    CardPlaceWideContentMiddleContainer,
    CardPlaceWideContentTopContainer,
    CardPlaceWideHeaderContainer,
    CardPlaceWidePlaceCategoryText,
    CardPlaceWidePlaceNameText,
    CardPlaceYelpButton,
} from './CardPlaceYelp.style'

export enum CardPlaceWideEnum {
    City,
    Search,
    Profile,
    ProfileOwnerList,
}

interface IReduxProps {
    openRecommendationModal: (placeInformation: RecommendationModalPlaceInformation) => void
    openListModal: (payload: OpenListModalPayload) => void
    venuesInLists: number[]
    venuesRecommended: number[]
    isPrelaunch: boolean
}
interface ICardPlaceWideProps extends IReduxProps, IWithAuthInjectedProps {
    place: IYelpRestaurant
    type: CardPlaceWideEnum
    handleRemoveFromList?: (place: IVenue) => void
}

const CardPlaceYelp: React.FC<ICardPlaceWideProps> = ({
    place,
    type,
    openRecommendationModal,
    openListModal,
    authenticatedAction,
    handleRemoveFromList,
    venuesInLists,
    venuesRecommended,
    isPrelaunch,
}) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const [currentPlace, setCurrentPlace] = React.useState(null)
    const [isMoreVisible, setMoreVisible] = React.useState(false)
    const windowSize = useWindowSize()
    const viewport: DeviceNameEnum =
        windowSize.width >= Number(size.laptop)
            ? DeviceNameEnum.laptop
            : windowSize.width >= Number(size.tablet)
            ? DeviceNameEnum.tablet
            : DeviceNameEnum.mobile

    React.useEffect(() => {
        setCurrentPlace(place)
    }, [place])

    const handleWriteRecommendation = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        if (_.has(place, 'id') && _.has(place, 'name')) {
            authenticatedAction(() => {
                openRecommendationModal({
                    placeID: String(place.id),
                    placeName: place.name,
                    recommendation_type: RecommendationModalType.Outsource,
                })
            })
        }
        e.stopPropagation()
    }

    const handleMore = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setMoreVisible(!isMoreVisible)
        e.stopPropagation()
    }

    const ViewMore = () => {
        return (
            <CardIcon onClick={handleMore}>
                {isMoreVisible ? (
                    <Image src={CloseSVG} alt="close-icon" />
                ) : (
                    <Image src={ExpandSVG} alt="ellipses-icon" />
                )}
            </CardIcon>
        )
    }

    return (
        currentPlace && (
            <Grow in={true}>
                <CardPlaceWideCardContainer id={type === CardPlaceWideEnum.Search ? 'search' : ''}>
                    <CardPlaceWideCardImageContainer id={type === CardPlaceWideEnum.Search ? 'search' : ''}>
                        <Image src={place ? place.imageURL : null} alt="recommendation-image" />
                    </CardPlaceWideCardImageContainer>
                    <CardPlaceWideCardContentContainer>
                        <CardPlaceWideContentTopContainer>
                            <CardPlaceWideHeaderContainer>
                                <WideHeaderContentContainer>
                                    <CardPlaceWidePlaceNameText>
                                        {place && place.name ? chopStringPlaceName(place.name, viewport, type) : null}
                                    </CardPlaceWidePlaceNameText>
                                </WideHeaderContentContainer>
                            </CardPlaceWideHeaderContainer>
                            {/* <CardRatings
                                          rating={place ? place.averageRating : 0}
                                          uniqueID={place ? place.id : 0}
                                          isAvg={true}
                                      /> */}
                            <WidePlaceAddressText>
                                {place && place.address1 ? addCommaToStreet(place.address1) : null}
                                {place && place.city ? place.city + ', ' : null}
                                {place && place.state ? place.state : null}
                                {place && place.zipCode ? ` ${place.zipCode}` : null}
                                {place && place.country ? ` ${place.country}` : null}
                                {/* {place && place.street ? place.street : null}
                                              {place && place.locality ? place.locality + ', ' : null}
                                              {place && place.state ? place.state : null}
                                              {place && place.postalCode ? ` ${place.postalCode}` : null} */}
                            </WidePlaceAddressText>
                            <CardPlaceWidePlaceCategoryText>
                                {place && place.categories
                                    ? chopStringPlaceCategories(
                                          concatCategories(
                                              place.categories.map((category: ICategory) => category.longName)
                                          ),
                                          viewport,
                                          type
                                      )
                                    : null}
                            </CardPlaceWidePlaceCategoryText>
                        </CardPlaceWideContentTopContainer>
                        <CardPlaceWideContentMiddleContainer>
                            <CardPlaceYelpButton onClick={handleWriteRecommendation}>
                                BE THE FIRST TO RECOMMEND
                            </CardPlaceYelpButton>
                            {/* <CardPlaceWideTitleText>
                                          {place && place.latestRecommendation && place.latestRecommendation.title
                                              ? chopStringPlaceLatestRecommendationTitle(
                                                    place.latestRecommendation.title,
                                                    viewport,
                                                    type
                                                )
                                              : null}
                                      </CardPlaceWideTitleText>
                                      <CardPlaceWideSummaryText>
                                          {place && place.latestRecommendation && place.latestRecommendation.content
                                              ? chopStringPlaceLatestRecommendationContent(
                                                    place.latestRecommendation.content,
                                                    viewport,
                                                    type
                                                )
                                              : null}
                                      </CardPlaceWideSummaryText> */}
                        </CardPlaceWideContentMiddleContainer>
                        <CardPlaceWideContentBottomContainer>
                            <CardPlaceWideAuthorNameText>
                                {/* {place && place.latestRecommendation && place.latestRecommendation.createdBy
                                              ? chopStringPlaceUserName(
                                                    `${place.latestRecommendation.createdBy.firstName} ${place.latestRecommendation.createdBy.lastName}`,
                                                    viewport,
                                                    type
                                                )
                                              : null} */}
                            </CardPlaceWideAuthorNameText>
                            <CardPlaceWideAuthorTitleText>
                                {/* {place && place.latestRecommendation && place.latestRecommendation.createdBy
                                              ? chopStringPlaceUserByLine(
                                                    place.latestRecommendation.createdBy.userByLine,
                                                    viewport,
                                                    type
                                                )
                                              : null} */}
                            </CardPlaceWideAuthorTitleText>
                        </CardPlaceWideContentBottomContainer>
                    </CardPlaceWideCardContentContainer>
                </CardPlaceWideCardContainer>
            </Grow>
        )
    )
}

const mapStateToProps = (state: StoreState) => ({
    venuesInLists: state.userReducer.venuesListsVenueIDs,
    venuesRecommended: state.userReducer.venuesRecommendedVenueIDs,
    isPrelaunch: state.prelaunchReducer.isPrelaunch,
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ openRecommendationModal, openListModal }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(CardPlaceYelp))
