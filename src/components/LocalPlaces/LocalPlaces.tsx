import { createStyles, makeStyles } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import axios, { FETCH_LOCAL_PLACES } from 'config/AxiosConfig'
import * as S from 'constants/StringConstants'
import React from 'react'
import CardPlaceWideList from 'sections/CardsList/CardPlaceWideList'
import { ILocalPlacesTab } from 'utilities/types/localPlacesTab'
import { IParentRegion } from 'utilities/types/parentRegion'
import { IVenue } from 'utilities/types/venue'
import {
    LocalPlacesContainer,
    LocalPlacesHeaderContainer,
    LocalPlacesHeaderSubTitleText,
    LocalPlacesHeaderTitleText,
    LocalPlacesTab,
    LocalPlacesTabsContainer,
} from './LocalPlaces.style'

interface ILocalPlacesProps {
    cityInformation: IParentRegion | undefined
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            formControl: {
                minWidth: 120,
            },
            selectEmpty: {},
            select: {
                fontFamily: 'Rubik',
                fontSize: '12px',
                fontWeight: 500,
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: '1.67',
                letterSpacing: '2px',
            },
            root: {
                marginTop: '30px',
            },
        },
    })
)
const LocalPlaces: React.FC<ILocalPlacesProps> = ({ cityInformation }) => {
    const classes = useStyles()
    const [currentTab, setCurrentTab] = React.useState<ILocalPlacesTab>(ILocalPlacesTab.MOST_RECOMMENDED)
    const [currentPlaces, setCurrentPlaces] = React.useState<IVenue[]>([])

    React.useEffect(() => {
        // TODO: Wire up initial API call to fetch the initial list
        // setTimeout(() => {
        //     setCurrentPlaces([mockVenue, mockVenue])
        // }, 1000)
        axios
            .get(FETCH_LOCAL_PLACES(cityInformation?.id, 0, currentTab))
            .then((res) => {
                console.log(res)
                // setCurrentPlaces([mockVenue, mockVenue])
                setCurrentPlaces(res.data)
                // TODO: Set the current cards to recommendations if tabs are meant to return recs
            })
            .catch((err) => console.log(err))
    }, [])

    const handleTabChange = (targetTab: ILocalPlacesTab) => {
        if (currentTab !== targetTab) {
            setCurrentTab(targetTab)
            axios
                .get(FETCH_LOCAL_PLACES(cityInformation?.id, 0, targetTab))
                .then((res) => {
                    console.log(res)
                    setCurrentPlaces(res.data)
                    // TODO: Set the current cards to recommendations if tabs are meant to return recs
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <LocalPlacesContainer>
            <LocalPlacesHeaderContainer>
                <LocalPlacesHeaderTitleText>{S.LOCAL_PLACES.Title}</LocalPlacesHeaderTitleText>
                <LocalPlacesHeaderSubTitleText>
                    {S.LOCAL_PLACES.SubTitle} {cityInformation?.city}
                </LocalPlacesHeaderSubTitleText>
            </LocalPlacesHeaderContainer>
            <LocalPlacesTabsContainer>
                <LocalPlacesTab
                    id={currentTab === ILocalPlacesTab.MOST_RECOMMENDED ? 'active' : ''}
                    onClick={() => handleTabChange(ILocalPlacesTab.MOST_RECOMMENDED)}
                >
                    MOST RECOMMENDED
                </LocalPlacesTab>
                <LocalPlacesTab
                    id={currentTab === ILocalPlacesTab.LATEST_RECOMMENDATIONS ? 'active' : ''}
                    onClick={() => handleTabChange(ILocalPlacesTab.LATEST_RECOMMENDATIONS)}
                >
                    LATEST RECOMMENDATIONS
                </LocalPlacesTab>
                <LocalPlacesTab
                    id={currentTab === ILocalPlacesTab.NEW_PLACES ? 'active' : ''}
                    onClick={() => handleTabChange(ILocalPlacesTab.NEW_PLACES)}
                >
                    NEW PLACES
                </LocalPlacesTab>
                <LocalPlacesTab
                    id={currentTab === ILocalPlacesTab.TRENDING_PLACES ? 'active' : ''}
                    onClick={() => handleTabChange(ILocalPlacesTab.TRENDING_PLACES)}
                >
                    TRENDING PLACES
                </LocalPlacesTab>
            </LocalPlacesTabsContainer>
            <CardPlaceWideList places={currentPlaces} type={CardPlaceWideEnum.City} />
            {/* TODO: Render Recommendations if the selected tab is latest recommendations (type === CardRecommendationWideEnum.City) */}
            <Pagination className={classes.root} count={1} variant="outlined" shape="rounded" />
        </LocalPlacesContainer>
    )
}

export default LocalPlaces
