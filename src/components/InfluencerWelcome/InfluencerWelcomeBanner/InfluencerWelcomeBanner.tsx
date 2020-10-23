import BackgroundImage from 'assets/Influencer-Welcome-Image.png'
import LogoLadySVG from 'assets/logo_svg/AATL_logo-mark.svg'
import Image from 'components/Image/Image'
import {
    InfluencerWelcomeBannerContainer,
    InfluencerWelcomeBannerLogoImage,
} from 'components/InfluencerWelcome/InfluencerWelcomeBanner/InfluencerWelcomeBanner.style'
import React from 'react'

interface IInfluencerWelcomeBannerProps {}

const InfluencerWelcomeBanner: React.FC<IInfluencerWelcomeBannerProps> = () => {
    return (
        <InfluencerWelcomeBannerContainer>
            <Image src={BackgroundImage} alt="background-image" />
            <InfluencerWelcomeBannerLogoImage src={LogoLadySVG} alt="logo-lady" />
        </InfluencerWelcomeBannerContainer>
    )
}

export default InfluencerWelcomeBanner
