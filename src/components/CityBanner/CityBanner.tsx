import CityImage from 'assets/mock-images/chicago.jpg'
import Image from 'components/Image/Image'
import React from 'react'
import { CityBannerContainer, CityBannerImageContainer, CityName } from './CityBanner.style'

interface ICityBannerProps {
    // cityName: string
    // imgSrc: string
}

const CityBanner: React.FC<ICityBannerProps> = () => {
    return (
        <CityBannerContainer>
            <CityBannerImageContainer>
                <Image src={CityImage} alt="city-image" />
            </CityBannerImageContainer>
            <CityName>Chicago</CityName>
        </CityBannerContainer>
    )
}

export default CityBanner
