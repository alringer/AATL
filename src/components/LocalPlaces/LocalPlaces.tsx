import { createStyles, makeStyles } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import CardRecommendationWide, {
    CardRecommendationWideEnum,
} from 'components/CardRecommendationWide/CardRecommendationWide'
import axios, { FETCH_LOCAL_PLACES } from 'config/AxiosConfig'
import * as S from 'constants/StringConstants'
import React from 'react'
import CardPlaceWideList from 'sections/CardsList/CardPlaceWideList'
import { ILocalPlacesTab } from 'utilities/types/localPlacesTab'
import { IParentRegion } from 'utilities/types/parentRegion'
import { IRecommendation } from 'utilities/types/recommendation'
import { IVenue } from 'utilities/types/venue'
import {
    LocalPlacesContainer,
    LocalPlacesContentContainer,
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
    const [currentRecommendations, setCurrentRecommendations] = React.useState<IRecommendation[]>([])
    const [currentTotal, setCurrentTotal] = React.useState(0)
    const [currentPageCount, setCurrentPageCount] = React.useState(0)
    const [currentPage, setCurrentPage] = React.useState(1)

    React.useEffect(() => {
        fetchData(0, currentTab)
    }, [])

    const handleTabChange = (targetTab: ILocalPlacesTab) => {
        if (currentTab !== targetTab) {
            fetchData(0, targetTab)
            setCurrentPage(1)
        }
    }

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        fetchData(value - 1, currentTab)
        setCurrentPage(value)
    }

    const fetchData = (page: number, sortEnum: ILocalPlacesTab) => {
        setCurrentTab(sortEnum)
        axios
            .get(FETCH_LOCAL_PLACES(cityInformation?.id, page, sortEnum))
            .then((res) => {
                console.log(res)
                switch (sortEnum) {
                    case ILocalPlacesTab.MOST_RECOMMENDED:
                        setCurrentRecommendations(res.data)
                        break
                    case ILocalPlacesTab.LATEST_RECOMMENDATIONS:
                        setCurrentRecommendations(res.data)
                        break
                    case ILocalPlacesTab.NEW_PLACES:
                        setCurrentPlaces(res.data)
                        break
                    case ILocalPlacesTab.TRENDING_PLACES:
                        setCurrentPlaces(res.data)
                        break
                }
                const total = Number(res.headers['x-total-count'])
                const pageCount = Math.ceil(total / 5)
                setCurrentTotal(total)
                setCurrentPageCount(pageCount)
            })
            .catch((err) => console.log(err))
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
            <LocalPlacesContentContainer>
                {currentTab === ILocalPlacesTab.MOST_RECOMMENDED ||
                currentTab === ILocalPlacesTab.LATEST_RECOMMENDATIONS ? (
                    currentRecommendations.map((recommendation: IRecommendation) => (
                        <CardRecommendationWide
                            isFull={true}
                            recommendation={recommendation}
                            type={CardRecommendationWideEnum.City}
                        />
                    ))
                ) : (
                    <CardPlaceWideList places={currentPlaces} type={CardPlaceWideEnum.City} />
                )}
            </LocalPlacesContentContainer>
            <Pagination
                className={classes.root}
                count={currentPageCount}
                page={currentPage}
                variant="outlined"
                shape="rounded"
                onChange={handlePagination}
            />
        </LocalPlacesContainer>
    )
}

export default LocalPlaces
