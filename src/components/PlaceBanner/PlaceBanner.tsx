import DiagonalUpArrow from 'assets/diagonal-up-arrow.svg'
import ShareIcon from 'assets/share-icon.svg'
import Image from 'components/Image/Image'
import Snackbar from 'components/Snackbar/Snackbar'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { useSnackbar } from 'notistack'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openRecommendationModal } from 'store/recommendationModal/recommendationModal_actions'
import { RecommendationModalPlaceInformation } from 'store/recommendationModal/recommendationModal_types'
import { query } from 'style/device'
import { concatCategories } from 'utilities/helpers/concatStrings'
import { formatPhone } from 'utilities/helpers/formatPhone'
import { IPlace } from 'utilities/types/place'
import {
    FindATableButton,
    PlaceBannerAddressCityStateZip,
    PlaceBannerAddressOne,
    PlaceBannerAddressSpan,
    PlaceBannerButtonsContainer,
    PlaceBannerCityState,
    PlaceBannerContactInformationSpan,
    PlaceBannerContainer,
    PlaceBannerContentContainer,
    PlaceBannerDescription,
    PlaceBannerImageContainer,
    PlaceBannerPhoneNumber,
    PlaceBannerPlaceCategory,
    PlaceBannerPlaceName,
    PlaceBannerRecommendNumber,
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
}

interface IPlaceBannerProps extends IPlace, IReduxProps {}

const PlaceBanner: React.FC<IPlaceBannerProps> = ({
    placeID,
    placeCategories,
    placeImageSrc,
    placeName,
    placeCity,
    placeAddress,
    placeAddressTwo,
    placeState,
    placeZip,
    placeNumberOfRecommendations,
    placeRating,
    placeDescription,
    placeWebsiteURL,
    placeStatePostal,
    placeNumber,
    openRecommendationModal,
}) => {
    const { enqueueSnackbar } = useSnackbar()

    const handleShare = () => {
        if (window !== undefined) {
            let inp = document.createElement('input')
            document.body.appendChild(inp)
            inp.value = window.location.href
            inp.select()
            document.execCommand('copy', false)
            inp.remove()
        }

        enqueueSnackbar('', {
            content: (
                <div>
                    <Snackbar
                        type={B.COPY_TO_CLIPBOARD.Type}
                        title={B.COPY_TO_CLIPBOARD.Title}
                        message={B.COPY_TO_CLIPBOARD.Body}
                    />
                </div>
            ),
        })
    }

    const handleFindATable = () => {
        // TODO: Wire up Find-A-Table API
        console.log(`Find-A-Table button is clicked for place with ID of ${placeID}`)
    }
    const handleRecommend = () => {
        // TODO: Send the user to the recommendation editor
        openRecommendationModal({ placeID: placeID, placeName: placeName })
        console.log(`Recommend-restaurant button is clicked for place with ID of ${placeID}`)
    }
    const handleVisitWebsite = () => {
        if (window !== undefined) {
            window.open(placeWebsiteURL, '_blank')
        }
    }

    return (
        <PlaceBannerContainer>
            <PlaceBannerImageContainer>
                <Image src={placeImageSrc} alt="restaurant-image" />
                <Media queries={query} defaultMatches={{ laptop: true }}>
                    {(matches) => (
                        <>
                            {matches.mobile && (
                                <ShareIconButton onClick={handleShare}>
                                    <Image src={ShareIcon} alt="diagonal-up-arrow" />
                                </ShareIconButton>
                            )}
                        </>
                    )}
                </Media>
            </PlaceBannerImageContainer>
            <PlaceBannerContentContainer>
                <PlaceBannerTextsContainer>
                    <PlaceBannerPlaceCategory>{concatCategories(placeCategories)}</PlaceBannerPlaceCategory>
                    <PlaceBannerPlaceName>{placeName}</PlaceBannerPlaceName>
                    <PlaceBannerCityState>
                        {placeCity}, {placeState}
                    </PlaceBannerCityState>
                    <PlaceBannerAddressSpan>
                        <PlaceBannerAddressOne>
                            {`${placeAddress},`} {placeAddressTwo ? `${placeAddressTwo},` : ''}
                        </PlaceBannerAddressOne>
                        &nbsp;
                        <PlaceBannerAddressCityStateZip>
                            {placeCity}, {placeStatePostal} {placeZip}
                        </PlaceBannerAddressCityStateZip>
                    </PlaceBannerAddressSpan>
                    <PlaceBannerRecommendSpan>
                        <PlaceBannerRecommendRating>{placeRating}</PlaceBannerRecommendRating>
                        &nbsp;
                        <PlaceBannerRecommendNumber>({placeNumberOfRecommendations})</PlaceBannerRecommendNumber>
                    </PlaceBannerRecommendSpan>
                    <PlaceBannerDescription>{placeDescription}</PlaceBannerDescription>
                    <PlaceBannerContactInformationSpan>
                        <PlaceBannerVisitWebsite onClick={handleVisitWebsite}>Visit Website</PlaceBannerVisitWebsite>
                        &nbsp;
                        <PlaceBannerPhoneNumber>/ {formatPhone(placeNumber)}</PlaceBannerPhoneNumber>
                    </PlaceBannerContactInformationSpan>
                    <PlaceBannerButtonsContainer>
                        <FindATableButton onClick={handleFindATable}>{S.BUTTON_LABELS.FindATable}</FindATableButton>
                        <RecommendButton onClick={handleRecommend}>{S.BUTTON_LABELS.Recommend}</RecommendButton>
                        <Media queries={query} defaultMatches={{ laptop: true }}>
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
                        </Media>
                    </PlaceBannerButtonsContainer>
                </PlaceBannerTextsContainer>
            </PlaceBannerContentContainer>
        </PlaceBannerContainer>
    )
}
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ openRecommendationModal }, dispatch)

export default reduxConnect(null, mapDispatchToProps)(PlaceBanner)
