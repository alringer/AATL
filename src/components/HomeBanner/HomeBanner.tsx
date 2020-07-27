import PlaceImage from 'assets/mock-images/restaurant-banner.jpg'
import Image from 'components/Image/Image'
import SearchFull from 'components/SearchFull/SearchFull'
import { useRouter } from 'next/router'
import React from 'react'
import buildURLWithParams from 'utilities/helpers/buildURLWithParams'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
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

interface IHomeBannerProps extends IWithAuthInjectedProps {}

const HomeBanner = ({ getTokenConfig }) => {
    const router = useRouter()
    const handleSearch = (place?: string, address?: string, lat?: string, lng?: string, sort?: SortEnum) => {
        const paramsArray: ParamType[] = [
            { label: 'place', value: place },
            { label: 'address', value: address },
            { label: 'lat', value: lat },
            { label: 'lng', value: lng },
            { label: 'sort', value: sort },
        ]
        const paramsURL = buildURLWithParams(paramsArray)
        let url = `/search` + `${paramsURL ? '?' + paramsURL : ''}`
        router.push(url)
    }

    return (
        <HomeBannerContainer>
            <HomeBannerImageContainer>
                <Image src={PlaceImage} alt="home-banner-image" />
            </HomeBannerImageContainer>
            <HomeBannerCenterContentContainer>
                <HomeBannerTitleText>ASK A TRAVEL LOCAL</HomeBannerTitleText>
                <HomeBannerSubTitleText>
                    Find the best local food when you're traveling. Recommended by locals for the foodie in you.{' '}
                </HomeBannerSubTitleText>
                <SearchFull
                    inputPlace={null}
                    inputAddress={null}
                    inputLat={null}
                    inputLng={null}
                    handleSearch={handleSearch}
                />
            </HomeBannerCenterContentContainer>
            <HomeBannerBottomContentContainer>
                <HomeBannerFooterText>Bud and Rob’s New Orleans Bistro</HomeBannerFooterText>
                <HomeBannerFooterText>Photo by Sean Kepri</HomeBannerFooterText>
            </HomeBannerBottomContentContainer>
        </HomeBannerContainer>
    )
}

export default withAuth(HomeBanner)
