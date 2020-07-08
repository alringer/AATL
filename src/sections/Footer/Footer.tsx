import { IconButton } from '@material-ui/core'
import FacebookSVG from 'assets/facebook-icon.svg'
import InstagramSVG from 'assets/instagram-icon.svg'
import TwitterSVG from 'assets/twitter-icon.svg'
import Image from 'components/Image/Image'
import axios, { FETCH_FOOTER } from 'config/AxiosConfig'
import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import Link from 'next/link'
import React from 'react'
import {
    FooterButtonsContainer,
    FooterContainer,
    FooterFirstRow,
    FooterInformationBody,
    FooterInformationTitle,
    FooterLeftColumn,
    FooterLinkItem,
    FooterLinksContainer,
    FooterLinkTitle,
    FooterRightColumn,
    FooterSecondRow,
    FooterTinyText,
} from './Footer.style'

const Footer = () => {
    React.useEffect(() => {
        axios
            .get(FETCH_FOOTER)
            .then((res) => console.log(res))
            .catch((err) => console.log('Error in ', err))
    }, [])

    const handleOpenFacebook = () => {
        if (window !== undefined) {
            window.open('https://www.facebook.com/AskaTravelLocal/', '_blank')
        }
    }
    const handleOpenInstagram = () => {
        if (window !== undefined) {
            window.open('https://www.instagram.com/askatravellocal/', '_blank')
        }
    }
    const handleOpenTwitter = () => {
        if (window !== undefined) {
            window.open('https://twitter.com/', '_blank')
        }
    }

    return (
        <FooterContainer>
            <FooterFirstRow>
                <FooterLeftColumn>
                    <FooterInformationTitle>{S.FOOTER_ITEMS.CompanyName}</FooterInformationTitle>
                    <FooterInformationBody>{S.FOOTER_ITEMS.FooterMessage}</FooterInformationBody>
                    <FooterButtonsContainer>
                        <IconButton onClick={handleOpenFacebook}>
                            <Image src={FacebookSVG} alt="icon" />
                        </IconButton>
                        <IconButton onClick={handleOpenInstagram}>
                            <Image src={InstagramSVG} alt="icon" />
                        </IconButton>
                        <IconButton onClick={handleOpenTwitter}>
                            <Image src={TwitterSVG} alt="icon" />
                        </IconButton>
                    </FooterButtonsContainer>
                </FooterLeftColumn>
                <FooterRightColumn>
                    <FooterLinksContainer>
                        <Link href={R.ROUTE_ITEMS.cities}>
                            <FooterLinkTitle>{S.FOOTER_ITEMS.Cities}</FooterLinkTitle>
                        </Link>
                        {/* TODO: Render dynamically and link them to the search page*/}
                        <FooterLinkItem>Atlanta</FooterLinkItem>
                        <FooterLinkItem>Chicago</FooterLinkItem>
                        <FooterLinkItem>San Diego</FooterLinkItem>
                    </FooterLinksContainer>
                    <FooterLinksContainer id="marginLeft">
                        <Link href={R.ROUTE_ITEMS.foodAndDrink}>
                            <FooterLinkTitle>{S.FOOTER_ITEMS.FoodAndDrinks}</FooterLinkTitle>
                        </Link>
                        {/* TODO: Render dynamically and link them to the search page */}
                        <FooterLinkItem>Burgers</FooterLinkItem>
                        <FooterLinkItem>Mexican</FooterLinkItem>
                        <FooterLinkItem>Japanese</FooterLinkItem>
                    </FooterLinksContainer>
                </FooterRightColumn>
            </FooterFirstRow>
            <FooterSecondRow>
                <FooterTinyText>{S.FOOTER_ITEMS.WithLove}</FooterTinyText>
                <FooterTinyText>{S.FOOTER_ITEMS.CopyRightText} </FooterTinyText>
            </FooterSecondRow>
        </FooterContainer>
    )
}

export default Footer
