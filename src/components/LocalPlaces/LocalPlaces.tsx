import { createStyles, makeStyles } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import * as S from 'constants/StringConstants'
import React from 'react'
import CardPlaceWideList from 'sections/CardsList/CardPlaceWideList'
import { PlaceBannerData } from 'stories/PlaceBanner.stories'
import { IPlace } from 'utilities/types/place'
import {
    LocalPlacesContainer,
    LocalPlacesHeaderContainer,
    LocalPlacesHeaderSubTitleText,
    LocalPlacesHeaderTitleText,
    LocalPlacesTab,
    LocalPlacesTabsContainer,
} from './LocalPlaces.style'

interface ILocalPlacesProps {
    cityName: string
}

enum LocalPlaceTabEnum {
    MostRecommended,
    LatestRecommendations,
    NewPlaces,
    TrendingPlaces,
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            marginTop: '30px',
        },
    })
)
const LocalPlaces: React.FC<ILocalPlacesProps> = ({ cityName }) => {
    const classes = useStyles()
    const [currentTab, setCurrentTab] = React.useState<LocalPlaceTabEnum>(LocalPlaceTabEnum.MostRecommended)
    const [currentPlaces, setCurrentPlaces] = React.useState<IPlace[]>([])

    React.useEffect(() => {
        // TODO: Wire up initial API call to fetch the initial list
        setTimeout(() => {
            setCurrentPlaces([PlaceBannerData.default, PlaceBannerData.longName])
        }, 1000)
    }, [])

    const handleTabChange = (targetTab: LocalPlaceTabEnum) => {
        if (currentTab !== targetTab) {
            setCurrentTab(targetTab)
            setTimeout(() => {
                setCurrentPlaces([PlaceBannerData.default, PlaceBannerData.longName])
            }, 1000)
        }
    }

    return (
        <LocalPlacesContainer>
            <LocalPlacesHeaderContainer>
                <LocalPlacesHeaderTitleText>{S.LOCAL_PLACES.Title}</LocalPlacesHeaderTitleText>
                <LocalPlacesHeaderSubTitleText>
                    {S.LOCAL_PLACES.SubTitle} {cityName}
                </LocalPlacesHeaderSubTitleText>
            </LocalPlacesHeaderContainer>
            <LocalPlacesTabsContainer>
                <LocalPlacesTab
                    id={currentTab === LocalPlaceTabEnum.MostRecommended ? 'active' : ''}
                    onClick={() => handleTabChange(LocalPlaceTabEnum.MostRecommended)}
                >
                    MOST RECOMMENDED
                </LocalPlacesTab>
                <LocalPlacesTab
                    id={currentTab === LocalPlaceTabEnum.LatestRecommendations ? 'active' : ''}
                    onClick={() => handleTabChange(LocalPlaceTabEnum.LatestRecommendations)}
                >
                    LATEST RECOMMENDATIONS
                </LocalPlacesTab>
                <LocalPlacesTab
                    id={currentTab === LocalPlaceTabEnum.NewPlaces ? 'active' : ''}
                    onClick={() => handleTabChange(LocalPlaceTabEnum.NewPlaces)}
                >
                    NEW PLACES
                </LocalPlacesTab>
                <LocalPlacesTab
                    id={currentTab === LocalPlaceTabEnum.TrendingPlaces ? 'active' : ''}
                    onClick={() => handleTabChange(LocalPlaceTabEnum.TrendingPlaces)}
                >
                    TRENDING PLACES
                </LocalPlacesTab>
            </LocalPlacesTabsContainer>
            <CardPlaceWideList places={currentPlaces} type={CardPlaceWideEnum.City} />
            <Pagination className={classes.root} count={1} variant="outlined" shape="rounded" />
        </LocalPlacesContainer>
    )
}

export default LocalPlaces
