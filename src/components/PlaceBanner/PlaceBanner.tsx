import SharePaperIcon from 'assets/restaurant-share-icon.svg'
import CardRatings from 'components/CardRatings/CardRatings'
import Image from 'components/Image/Image'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import _ from 'lodash'
import Link from 'next/link'
import { useSnackbar } from 'notistack'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openListModal } from 'store/listModal/listModal_actions'
import { ListModalViewEnum, OpenListModalPayload } from 'store/listModal/listModal_types'
import { openRecommendationModal } from 'store/recommendationModal/recommendationModal_actions'
import {
    RecommendationModalPlaceInformation,
    RecommendationModalType,
} from 'store/recommendationModal/recommendationModal_types'
import { query } from 'style/device'
import { concatCategories } from 'utilities/helpers/concatStrings'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { ICategory } from 'utilities/types/category'
import { IVenue } from 'utilities/types/venue'
import {
    AddToListButton,
    PlaceBannerAddressCityStateZip,
    PlaceBannerAddressOne,
    PlaceBannerAddressSpan,
    PlaceBannerAnchor,
    PlaceBannerButtonsBottomContainer,
    PlaceBannerButtonsContainer,
    PlaceBannerButtonsTopContainer,
    PlaceBannerCityState,
    PlaceBannerContactInformationSpan,
    PlaceBannerContainer,
    PlaceBannerContentContainer,
    PlaceBannerDescription,
    PlaceBannerImageContainer,
    PlaceBannerPhoneNumber,
    PlaceBannerPlaceCategory,
    PlaceBannerPlaceName,
    PlaceBannerRecommendRating,
    PlaceBannerRecommendSpan,
    PlaceBannerTextsContainer,
    PlaceBannerVisitWebsite,
    RecommendButton,
    ShareButton,
    ShareIconButton,
} from './PlaceBanner.style'

interface IReduxProps {
    openRecommendationModal: (placeInformation: RecommendationModalPlaceInformation) => void
    openListModal: (payload: OpenListModalPayload) => void
}

interface IPlaceBannerProps extends IReduxProps, IWithAuthInjectedProps {
    venueInformation: IVenue | null
}

const PlaceBanner: React.FC<IPlaceBannerProps> = ({
    venueInformation,
    openRecommendationModal,
    authenticatedAction,
    openListModal,
}) => {
    const { enqueueSnackbar } = useSnackbar()

    const handleShare = () => {
        if (window !== undefined) {
            navigator.clipboard
                .writeText(window.location.href)
                .then(() => {
                    enqueueSnackbar('', {
                        content: (
                            <div>
                                <Snackbar
                                    type={B.COPY_TO_CLIPBOARD.Type}
                                    title={B.COPY_TO_CLIPBOARD.Title}
                                    message={<SnackbarMessageBody>{B.COPY_TO_CLIPBOARD.Body}</SnackbarMessageBody>}
                                />
                            </div>
                        ),
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const handleRecommend = () => {
        if (_.has(venueInformation, 'id') && _.has(venueInformation, 'name')) {
            authenticatedAction(() =>
                openRecommendationModal({
                    placeID: String(venueInformation.id),
                    placeName: venueInformation.name,
                    recommendation_type: RecommendationModalType.AATL,
                })
            )
        }
    }

    const handleAddToList = () => {
        if (_.has(venueInformation, 'id')) {
            authenticatedAction(() => {
                const openListModalPayload: OpenListModalPayload = {
                    currentListModalView: ListModalViewEnum.AddToRestaurantList,
                    placeID: venueInformation.id,
                }
                openListModal(openListModalPayload)
            })
        }
    }
    const handleVisitWebsite = () => {
        if (window !== undefined && _.has(venueInformation, 'websiteURL')) {
            window.open(venueInformation.websiteURL, '_blank')
        }
    }

    return venueInformation ? (
        <PlaceBannerContainer>
            <PlaceBannerImageContainer>
                <Image src={venueInformation.imageCDNUrl} alt="restaurant-image" />
                {/* <Media queries={query} defaultMatches={{ mobile: true }}>
                    {(matches) => (
                        <>
                            {matches.mobile && (
                                <ShareIconButton onClick={handleShare}>
                                    <Image src={ShareIcon} alt="diagonal-up-arrow" />
                                </ShareIconButton>
                            )}
                        </>
                    )}
                </Media> */}
            </PlaceBannerImageContainer>
            <PlaceBannerContentContainer>
                <PlaceBannerTextsContainer>
                    <PlaceBannerPlaceCategory>
                        {concatCategories(venueInformation.categories.map((category: ICategory) => category.longName))}
                    </PlaceBannerPlaceCategory>
                    <PlaceBannerPlaceName>{venueInformation.name}</PlaceBannerPlaceName>
                    <CardRatings
                        rating={venueInformation.averageRating}
                        color={'white'}
                        uniqueID={venueInformation.id}
                        isAvg={true}
                    />
                    <PlaceBannerCityState>
                        {venueInformation.parentRegion.city}, {venueInformation.parentRegion.state}
                    </PlaceBannerCityState>
                    <PlaceBannerAddressSpan>
                        <PlaceBannerAddressOne>{`${venueInformation.street}`}</PlaceBannerAddressOne>
                        &nbsp;
                        <PlaceBannerAddressCityStateZip>
                            {venueInformation.parentRegion.city}, {venueInformation.parentRegion.stateAbbrevation}{' '}
                            {venueInformation.postalCode} {venueInformation.iso3Country}
                        </PlaceBannerAddressCityStateZip>
                    </PlaceBannerAddressSpan>
                    <PlaceBannerRecommendSpan>
                        <PlaceBannerRecommendRating>
                            Recommended {venueInformation.recommendations.totalCount} times
                        </PlaceBannerRecommendRating>
                        {/* <PlaceBannerRecommendNumber>
                            Recommended {venueInformation.recommendations.totalCount} times
                        </PlaceBannerRecommendNumber> */}
                    </PlaceBannerRecommendSpan>
                    <PlaceBannerDescription>{venueInformation.content}</PlaceBannerDescription>
                    <PlaceBannerContactInformationSpan>
                        {venueInformation.websiteURL ? (
                            <Link href={venueInformation.websiteURL} passHref={true} prefetch={false}>
                                <PlaceBannerAnchor target="_blank">
                                    <PlaceBannerVisitWebsite>{S.RESTAURANT_PAGE.VisitWebsite}</PlaceBannerVisitWebsite>
                                </PlaceBannerAnchor>
                            </Link>
                        ) : null}
                        &nbsp;
                        {venueInformation.phoneNumFormatted ? (
                            <Link href={`tel:${venueInformation.phoneNumFormatted}`} passHref={true} prefetch={false}>
                                <PlaceBannerAnchor target="_blank">
                                    <PlaceBannerPhoneNumber>
                                        {venueInformation.phoneNumFormatted}
                                    </PlaceBannerPhoneNumber>
                                </PlaceBannerAnchor>
                            </Link>
                        ) : null}
                    </PlaceBannerContactInformationSpan>
                    <PlaceBannerButtonsContainer>
                        <PlaceBannerButtonsTopContainer>
                            <RecommendButton onClick={handleRecommend}>{S.BUTTON_LABELS.Recommend}</RecommendButton>
                            <AddToListButton onClick={handleAddToList}>{S.BUTTON_LABELS.AddToList}</AddToListButton>
                        </PlaceBannerButtonsTopContainer>
                        <PlaceBannerButtonsBottomContainer>
                            <Media queries={query} defaultMatches={{ mobile: true }}>
                                {(matches) => (
                                    <>
                                        {(matches.laptop || matches.tablet) && (
                                            <ShareIconButton onClick={handleShare}>
                                                <img src={SharePaperIcon} alt="share-icon" />
                                            </ShareIconButton>
                                        )}
                                        {matches.mobile && (
                                            <ShareButton onClick={handleShare}>{S.BUTTON_LABELS.Share}</ShareButton>
                                        )}
                                    </>
                                )}
                            </Media>
                        </PlaceBannerButtonsBottomContainer>
                        {/* <Media queries={query} defaultMatches={{ mobile: true }}>
                            {(matches) => (
                                <>
                                    {(matches.laptop || matches.tablet) && (
                                        <ShareButton onClick={handleShare}>
                                            <Image src={DiagonalUpArrow} alt="diagonal-up-arrow" />
                                            {S.BUTTON_LABELS.Share}
                                        </ShareButton>
                                    )}
                                </>
                            )}
                        </Media> */}
                    </PlaceBannerButtonsContainer>
                </PlaceBannerTextsContainer>
            </PlaceBannerContentContainer>
        </PlaceBannerContainer>
    ) : null
}
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ openRecommendationModal, openListModal }, dispatch)

export default reduxConnect(null, mapDispatchToProps)(withAuth(PlaceBanner))
