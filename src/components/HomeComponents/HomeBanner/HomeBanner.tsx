import PlaceImage from 'assets/mock-images/restaurant-banner.jpg'
import Image from 'components/Image/Image'
import SearchFull from 'components/SearchFull/SearchFull'
import * as S from 'constants/StringConstants'
import { useRouter } from 'next/router'
import React from 'react'
import Media from 'react-media'
import { query } from 'style/device'
import buildURLWithParams from 'utilities/helpers/buildURLWithParams'
import { ParamType } from 'utilities/types/clientDTOS/ParamType'
import { SortEnum } from 'utilities/types/clientDTOS/SortType'
import {
    HomeBannerBottomContentContainer,
    HomeBannerCenterContentContainer,
    HomeBannerContainer,
    HomeBannerFooterText,
    HomeBannerImageContainer,
    HomeBannerSubTitleText,
    HomeBannerTitleText,
} from './HomeBanner.style'

interface IHomeBannerProps {}

const HomeBanner = () => {
    const router = useRouter()

    const handleSearch = (
        place?: string,
        categoryID?: string,
        address?: string,
        lat?: string,
        lng?: string,
        sort?: SortEnum,
        page?: string
    ) => {
        const paramsArray: ParamType[] = [
            { label: 'place', value: place },
            { label: 'categoryID', value: categoryID },
            { label: 'address', value: address },
            { label: 'lat', value: lat },
            { label: 'lng', value: lng },
            { label: 'sort', value: sort },
            { label: 'page', value: page },
        ]
        const paramsURL = buildURLWithParams(paramsArray)
        let url = `/search` + `${paramsURL ? '?' + paramsURL : ''}`
        router.push(url)
    }

    return (
        <Media queries={query} defaultMatches={{ mobile: true }}>
            {(matches) => (
                <HomeBannerContainer>
                    <HomeBannerImageContainer>
                        <Image src={PlaceImage} alt="home-banner-image" />
                    </HomeBannerImageContainer>
                    <HomeBannerCenterContentContainer>
                        {(matches.laptop || matches.tablet) && (
                            <HomeBannerTitleText>{S.HOME_PAGE.BannerTitle}</HomeBannerTitleText>
                        )}
                        <HomeBannerSubTitleText>{S.HOME_PAGE.BannerSubTitle}</HomeBannerSubTitleText>
                        <SearchFull
                            inputPlace={null}
                            inputCategoryID={null}
                            inputAddress={''}
                            inputLat={null}
                            inputLng={null}
                            handleSearch={handleSearch}
                        />
                    </HomeBannerCenterContentContainer>
                    {matches.laptop && (
                        <HomeBannerBottomContentContainer>
                            <HomeBannerFooterText>{S.HOME_PAGE.BannerPhotoRestaurantName}</HomeBannerFooterText>
                            <HomeBannerFooterText>{S.HOME_PAGE.BannerPhotoPhotographer}</HomeBannerFooterText>
                        </HomeBannerBottomContentContainer>
                    )}
                </HomeBannerContainer>
            )}
        </Media>
    )
}

export default HomeBanner
