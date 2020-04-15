import { IconButton } from '@material-ui/core'
import FacebookSVG from 'assets/facebook-icon.svg'
import InstagramSVG from 'assets/instagram-icon.svg'
import TwitterSVG from 'assets/twitter-icon.svg'
import Image from 'components/Image/Image'
import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import Link from 'next/link'
import {
    FooterButtonsContainer,
    FooterContainer,
    FooterFirstRow,
    FooterInformationBody,
    FooterInformationTitle,
    FooterLeftColumn,
    FooterLinkAnchor,
    FooterLinkItem,
    FooterLinksContainer,
    FooterLinkTitle,
    FooterRightColumn,
    FooterSecondRow,
    FooterTinyText,
} from './Footer.style'

const Footer = () => {
    return (
        <FooterContainer>
            <FooterFirstRow>
                <FooterLeftColumn>
                    <FooterInformationTitle>{S.FOOTER_ITEMS.CompanyName}</FooterInformationTitle>
                    <FooterInformationBody>{S.FOOTER_ITEMS.FooterMessage}</FooterInformationBody>
                    <FooterButtonsContainer>
                        <IconButton onClick={() => window.open('https://www.facebook.com/AskaTravelLocal/', '_blank')}>
                            <Image src={FacebookSVG} alt="icon" />
                        </IconButton>
                        <IconButton onClick={() => window.open('https://www.instagram.com/askatravellocal/', '_blank')}>
                            <Image src={InstagramSVG} alt="icon" />
                        </IconButton>
                        <IconButton onClick={() => window.open('https://twitter.com/', '_blank')}>
                            <Image src={TwitterSVG} alt="icon" />
                        </IconButton>
                    </FooterButtonsContainer>
                </FooterLeftColumn>
                <FooterRightColumn>
                    <FooterLinksContainer>
                        <Link href={R.ROUTE_ITEMS.cities}>
                            <FooterLinkAnchor>
                                <FooterLinkTitle>{S.FOOTER_ITEMS.Cities}</FooterLinkTitle>
                            </FooterLinkAnchor>
                        </Link>
                        {/* TODO: Render dynamically and link them to the search page*/}
                        <FooterLinkItem>Atlanta</FooterLinkItem>
                        <FooterLinkItem>Chicago</FooterLinkItem>
                        <FooterLinkItem>San Diego</FooterLinkItem>
                    </FooterLinksContainer>
                    <FooterLinksContainer id="marginLeft">
                        <Link href={R.ROUTE_ITEMS.foodAndDrink}>
                            <FooterLinkAnchor>
                                <FooterLinkTitle>{S.FOOTER_ITEMS.FoodAndDrinks}</FooterLinkTitle>
                            </FooterLinkAnchor>
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
