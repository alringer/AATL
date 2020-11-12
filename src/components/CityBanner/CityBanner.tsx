import React from 'react'
import { IParentRegion } from 'utilities/types/parentRegion'
import { CityBannerContainer, CityBannerImage, CityBannerImageContainer, CityName } from './CityBanner.style'

interface ICityBannerProps {
    cityInformation: IParentRegion | null
}

const CityBanner: React.FC<ICityBannerProps> = ({ cityInformation }) => {
    return (
        <CityBannerContainer>
            <CityBannerImageContainer>
                <CityBannerImage
                    srcSet={`${cityInformation.imageUrlMobile} 768w,
                            ${cityInformation.imageUrlTablet} 1440w,
                            ${cityInformation.imageUrlDesktop} 2560w`}
                    src={cityInformation.imageUrlDesktop}
                    alt="city-image"
                />
            </CityBannerImageContainer>
            <CityName>{cityInformation ? cityInformation.city : null}</CityName>
        </CityBannerContainer>
    )
}

export default CityBanner
