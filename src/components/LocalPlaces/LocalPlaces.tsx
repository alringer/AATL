import { createStyles, makeStyles } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import CardRecommendationWide, {
    CardRecommendationWideEnum,
} from 'components/CardRecommendationWide/CardRecommendationWide'
import * as S from 'constants/StringConstants'
import React, { RefObject } from 'react'
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
    currentTab: ILocalPlacesTab
    currentPlaces: IVenue[]
    currentRecommendations: IRecommendation[]
    currentTotal: number
    currentPageCount: number
    currentPage: number
    refLocalPlaces: RefObject<HTMLDivElement> | null
    handleTabChange: (targetTab: ILocalPlacesTab) => void
    handlePagination: (event: React.ChangeEvent<unknown>, value: number) => void
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
const LocalPlaces: React.FC<ILocalPlacesProps> = ({
    cityInformation,
    currentTab,
    currentPlaces,
    currentRecommendations,
    currentTotal,
    currentPageCount,
    currentPage,
    refLocalPlaces,
    handleTabChange,
    handlePagination,
}) => {
    const classes = useStyles()

    return (
        <LocalPlacesContainer ref={refLocalPlaces}>
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
                            key={recommendation.id}
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
