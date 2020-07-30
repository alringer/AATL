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
import { IFooter } from 'utilities/types/footer'
import { ICategory } from '../../utilities/types/category'
import { IParentRegion } from '../../utilities/types/parentRegion'
import {
    FooterAnchor,
    FooterButtonsContainer,
    FooterContainer,
    FooterFirstRow,
    FooterInformationBody,
    FooterInformationTitle,
    FooterLeftColumn,
    FooterLinkItem,
    FooterLinksContainer,
    FooterLinkTitle,
    FooterLinkTitleAnchor,
    FooterRightColumn,
    FooterSecondRow,
    FooterTinyText,
} from './Footer.style'

const Footer = () => {
    const [footerInformation, setFooterInformation] = React.useState<IFooter | undefined>()
    React.useEffect(() => {
        axios
            .get(FETCH_FOOTER)
            .then((res) => setFooterInformation(res.data))
            .catch((err) => console.log('Error in Footer', err))
    }, [])

    return (
        <FooterContainer>
            <FooterFirstRow>
                <FooterLeftColumn>
                    <FooterInformationTitle>{S.FOOTER_ITEMS.CompanyName}</FooterInformationTitle>
                    <FooterInformationBody>{S.FOOTER_ITEMS.FooterMessage}</FooterInformationBody>
                    <FooterButtonsContainer>
                        <Link href={'https://www.facebook.com/AskaTravelLocal/'} passHref={true} prefetch={false}>
                            <a target={'_blank'}>
                                <IconButton>
                                    <Image src={FacebookSVG} alt="icon" />
                                </IconButton>
                            </a>
                        </Link>
                        <Link href={'https://www.instagram.com/askatravellocal/'} passHref={true} prefetch={false}>
                            <a target={'_blank'}>
                                <IconButton>
                                    <Image src={InstagramSVG} alt="icon" />
                                </IconButton>
                            </a>
                        </Link>
                        <Link href={'https://twitter.com/askatravellocal'} passHref={true} prefetch={false}>
                            <a target={'_blank'}>
                                <IconButton>
                                    <Image src={TwitterSVG} alt="icon" />
                                </IconButton>
                            </a>
                        </Link>
                    </FooterButtonsContainer>
                </FooterLeftColumn>
                <FooterRightColumn>
                    <FooterLinksContainer>
                        <Link href={R.ROUTE_ITEMS.cities} passHref>
                            <FooterLinkTitleAnchor>
                                <FooterLinkTitle>{S.FOOTER_ITEMS.Cities}</FooterLinkTitle>
                            </FooterLinkTitleAnchor>
                        </Link>
                        {footerInformation &&
                            footerInformation.mostRecommendedParentRegions.map((parentRegion: IParentRegion) => (
                                <Link
                                    href={`${R.ROUTE_ITEMS.city}/${parentRegion.id}`}
                                    passHref={true}
                                    prefetch={false}
                                    key={parentRegion.id}
                                >
                                    <FooterAnchor>
                                        <FooterLinkItem key={parentRegion.id}>{parentRegion.city}</FooterLinkItem>
                                    </FooterAnchor>
                                </Link>
                            ))}
                    </FooterLinksContainer>
                    <FooterLinksContainer id="marginLeft">
                        <Link href={R.ROUTE_ITEMS.foodAndDrink} passHref>
                            <FooterLinkTitleAnchor>
                                <FooterLinkTitle>{S.FOOTER_ITEMS.FoodAndDrinks}</FooterLinkTitle>
                            </FooterLinkTitleAnchor>
                        </Link>
                        {footerInformation &&
                            footerInformation.mostRecommendedCategories.map((category: ICategory) => (
                                <Link
                                    href={`${R.ROUTE_ITEMS.search}?place=${category.longName}`}
                                    passHref={true}
                                    prefetch={false}
                                    key={category.id}
                                >
                                    <FooterAnchor>
                                        <FooterLinkItem key={category.id}>{category.longName}</FooterLinkItem>
                                    </FooterAnchor>
                                </Link>
                            ))}
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
