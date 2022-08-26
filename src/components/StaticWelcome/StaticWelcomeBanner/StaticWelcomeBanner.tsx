import LogoLadySVG from 'assets/logo_svg/LFB_logo-mark.svg'
import BackgroundImage from 'assets/NYC.png'
import Image from 'components/Image/Image'
import {
    StaticWelcomeBannerContainer,
    StaticWelcomeBannerLogoImage,
} from 'components/StaticWelcome/StaticWelcomeBanner/StaticWelcomeBanner.style'
import React from 'react'

interface IStaticWelcomeBannerProps {}

const StaticWelcomeBanner: React.FC<IStaticWelcomeBannerProps> = () => {
    return (
        <StaticWelcomeBannerContainer>
            <Image src={BackgroundImage} alt="background-image" />
            <StaticWelcomeBannerLogoImage src={LogoLadySVG} alt="logo-lady" />
        </StaticWelcomeBannerContainer>
    )
}

export default StaticWelcomeBanner
