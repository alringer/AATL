import PlaceImage from 'assets/mock-images/restaurant-banner.jpg'
import Image from 'components/Image/Image'
import SearchFull from 'components/SearchFull/SearchFull'
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
        sort?: SortEnum
    ) => {
        const paramsArray: ParamType[] = [
            { label: 'place', value: place },
            { label: 'address', value: address },
            { label: 'lat', value: lat },
            { label: 'lng', value: lng },
            { label: 'sort', value: sort },
            { label: 'categoryID', value: categoryID },
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
                            <HomeBannerTitleText>ASK A TRAVEL LOCAL</HomeBannerTitleText>
                        )}
                        <HomeBannerSubTitleText>
                            Find the best local food when you're traveling. Recommended by locals for the foodie in you.{' '}
                        </HomeBannerSubTitleText>
                        <SearchFull
                            inputPlace={null}
                            inputCategoryID={null}
                            inputAddress={null}
                            inputLat={null}
                            inputLng={null}
                            handleSearch={handleSearch}
                        />
                    </HomeBannerCenterContentContainer>
                    {matches.laptop && (
                        <HomeBannerBottomContentContainer>
                            <HomeBannerFooterText>Bud and Rob’s New Orleans Bistro</HomeBannerFooterText>
                            <HomeBannerFooterText>Photo by Sean Kepri</HomeBannerFooterText>
                        </HomeBannerBottomContentContainer>
                    )}
                </HomeBannerContainer>
            )}
        </Media>
    )
}

export default HomeBanner
