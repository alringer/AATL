import { IconButton } from '@material-ui/core'
import FacebookSVG from 'assets/facebook-icon.svg'
import InstagramSVG from 'assets/instagram-icon.svg'
import TwitterSVG from 'assets/twitter-icon.svg'
import Image from 'components/Image/Image'
import axios, { FETCH_FOOTER } from 'config/AxiosConfig'
import * as R from 'constants/RouteConstants'
import * as M from 'constants/SocialMediaConstants'
import * as S from 'constants/StringConstants'
import Link from 'next/link'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'
import { IFooter } from 'utilities/types/footer'
import { ICategory } from '../../utilities/types/category'
import { IParentRegion } from '../../utilities/types/parentRegion'
import {
    ContactUsRowContainer,
    ContactUsText,
    EmailIcon,
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
    FooterPrelaunchContainer,
    FooterRightColumn,
    FooterRightColumnRow,
    FooterSecondRow,
    FooterTermsOfUseAnchor,
    FooterTinyText,
    LocationIcon,
} from './Footer.style'

interface IReduxProps {
    isPrelaunch: boolean
}
interface IFooterProps extends IReduxProps {}

const Footer: React.FC<IFooterProps> = ({ isPrelaunch }) => {
    const [footerInformation, setFooterInformation] = React.useState<IFooter | undefined>()
    React.useEffect(() => {
        axios
            .get(FETCH_FOOTER)
            .then((res) => setFooterInformation(res.data))
            .catch((err) => console.log('Error in Footer', err))
    }, [])

    return (
        <FooterContainer isPrelaunch={isPrelaunch}>
            {isPrelaunch ? (
                <FooterPrelaunchContainer></FooterPrelaunchContainer>
            ) : (
                <>
                    <FooterFirstRow>
                        <FooterLeftColumn>
                            <FooterInformationTitle>{S.FOOTER_ITEMS.CompanyName}</FooterInformationTitle>
                            <FooterInformationBody>{S.FOOTER_ITEMS.FooterMessage}</FooterInformationBody>
                            <FooterButtonsContainer>
                                <Link href={M.FACEBOOK} passHref={true} prefetch={false}>
                                    <a target={'_blank'}>
                                        <IconButton>
                                            <Image src={FacebookSVG} alt="icon" />
                                        </IconButton>
                                    </a>
                                </Link>
                                <Link href={M.INSTAGRAM} passHref={true} prefetch={false}>
                                    <a target={'_blank'}>
                                        <IconButton>
                                            <Image src={InstagramSVG} alt="icon" />
                                        </IconButton>
                                    </a>
                                </Link>
                                <Link href={M.TWITTER} passHref={true} prefetch={false}>
                                    <a target={'_blank'}>
                                        <IconButton>
                                            <Image src={TwitterSVG} alt="icon" />
                                        </IconButton>
                                    </a>
                                </Link>
                            </FooterButtonsContainer>
                        </FooterLeftColumn>
                        <FooterRightColumn>
                            <FooterRightColumnRow>
                                <FooterLinksContainer>
                                    <Link href={R.ROUTE_ITEMS.cities} passHref>
                                        <FooterLinkTitleAnchor>
                                            <FooterLinkTitle>{S.FOOTER_ITEMS.Cities}</FooterLinkTitle>
                                        </FooterLinkTitleAnchor>
                                    </Link>
                                    {footerInformation &&
                                        footerInformation.mostRecommendedParentRegions.map(
                                            (parentRegion: IParentRegion) => (
                                                <Link
                                                    href={`${R.ROUTE_ITEMS.city}/${parentRegion.id}`}
                                                    passHref={true}
                                                    prefetch={false}
                                                    key={parentRegion.id}
                                                >
                                                    <FooterAnchor>
                                                        <FooterLinkItem key={parentRegion.id}>
                                                            {parentRegion.city}
                                                        </FooterLinkItem>
                                                    </FooterAnchor>
                                                </Link>
                                            )
                                        )}
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
                                                    <FooterLinkItem key={category.id}>
                                                        {category.longName}
                                                    </FooterLinkItem>
                                                </FooterAnchor>
                                            </Link>
                                        ))}
                                </FooterLinksContainer>
                            </FooterRightColumnRow>
                            <FooterRightColumnRow style={{ marginTop: '20px' }}>
                                <FooterLinksContainer>
                                    <FooterLinkTitle>{S.FOOTER_ITEMS.ContactUs}</FooterLinkTitle>
                                    <ContactUsRowContainer>
                                        <EmailIcon />{' '}
                                        <Link
                                            href={`mailto:${S.FOOTER_ITEMS.ContactEmail}`}
                                            passHref={true}
                                            prefetch={false}
                                        >
                                            <FooterTermsOfUseAnchor>
                                                <ContactUsText>{S.FOOTER_ITEMS.ContactEmail}</ContactUsText>
                                            </FooterTermsOfUseAnchor>
                                        </Link>
                                    </ContactUsRowContainer>
                                    <ContactUsRowContainer>
                                        <LocationIcon /> <ContactUsText>{S.FOOTER_ITEMS.ContactLocation}</ContactUsText>
                                    </ContactUsRowContainer>
                                </FooterLinksContainer>
                            </FooterRightColumnRow>
                        </FooterRightColumn>
                    </FooterFirstRow>
                    <FooterSecondRow>
                        <FooterTinyText>
                            {S.FOOTER_ITEMS.WithLove} {S.FOOTER_ITEMS.SeeOur}{' '}
                            <Link href={`${R.ROUTE_ITEMS.termsAndConditions}`} passHref={true} prefetch={false}>
                                <FooterTermsOfUseAnchor>{S.FOOTER_ITEMS.TermsOfUse}</FooterTermsOfUseAnchor>
                            </Link>
                        </FooterTinyText>
                        <FooterTinyText>{S.FOOTER_ITEMS.CopyRightText} </FooterTinyText>
                    </FooterSecondRow>
                </>
            )}
        </FooterContainer>
    )
}

const mapStateToProps = (state: StoreState) => ({
    isPrelaunch: state.prelaunchReducer.isPrelaunch,
})

export default reduxConnect(mapStateToProps)(Footer)
