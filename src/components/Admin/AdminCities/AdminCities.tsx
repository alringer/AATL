import { CircularProgress } from '@material-ui/core'
import Image from 'components/Image/Image'
import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import Link from 'next/link'
import React from 'react'
import { IAdminCity } from 'utilities/types/adminCity'
import { AdminMenuPageSubTitle, AdminMenuPageTitle } from '../AdminShared.style'
import {
    AdminCitiesCityColumn,
    AdminCitiesContainer,
    AdminCitiesImageColumn,
    AdminCitiesLoadingContainer,
    AdminCitiesPlacesColumn,
    AdminCitiesRecommendationsAscendingSortIcon,
    AdminCitiesRecommendationsColumn,
    AdminCitiesRecommendationsDescendingSortIcon,
    AdminCitiesRecommendationsSortButton,
    // AdminCitiesSearchButton,
    // AdminCitiesSearchContainer,
    AdminCitiesStateColumn,
    AdminCitiesTableContainer,
    AdminCitiesTableHeaderRow,
    AdminCitiesTableRow,
    AdminCityAnchor,
    AdminCityText,
} from './AdminCities.style'

interface IAdminCitiesProps {
    listCities: IAdminCity[]
    isLoadingCities: boolean
}

const AdminCities: React.FC<IAdminCitiesProps> = ({ listCities, isLoadingCities }) => {
    // TBD: Search
    // const [searchInput, setSearchInput] = React.useState('')
    const [cities, setCities] = React.useState<IAdminCity[]>([])
    const [isDescending, setDescending] = React.useState(true)

    React.useEffect(() => {
        const sortedCities = sortCities(listCities, isDescending)
        setCities(sortedCities)
    }, [listCities])

    const sortCities = (inputCities: IAdminCity[], isDescending: boolean) => {
        const sortedCities = inputCities.sort((a, b) =>
            isDescending
                ? a.recommendationsCount < b.recommendationsCount
                    ? 1
                    : a.recommendationsCount === b.recommendationsCount
                    ? a.city > b.city
                        ? 1
                        : -1
                    : -1
                : a.recommendationsCount < b.recommendationsCount
                ? -1
                : a.recommendationsCount === b.recommendationsCount
                ? a.city > b.city
                    ? 1
                    : -1
                : 1
        )
        setDescending(!isDescending)
        return sortedCities
    }

    // TBD: Search
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchInput(e.target.value)
    // }

    const handleSort = () => {
        const sortedCities = sortCities(cities, isDescending)
        setCities(sortedCities)
    }

    return (
        <AdminCitiesContainer>
            <AdminMenuPageTitle>{S.ADMIN_PAGE.AdminCities.Title}</AdminMenuPageTitle>
            <AdminMenuPageSubTitle>{S.ADMIN_PAGE.AdminCities.SubTitle}</AdminMenuPageSubTitle>
            {/* TBD: Search */}
            {/* <AdminCitiesSearchContainer>
                // <CustomTextField
                    value={searchInput}
                    placeholder="Search cities"
                    onChange={handleChange}
                    variant="outlined"
                />
                <AdminCitiesSearchButton>SEARCH</AdminCitiesSearchButton>
            </AdminCitiesSearchContainer> */}
            <AdminCitiesTableContainer>
                <AdminCitiesTableHeaderRow>
                    <AdminCitiesImageColumn isHeader={true}>{S.ADMIN_PAGE.AdminCities.Image}</AdminCitiesImageColumn>
                    <AdminCitiesCityColumn isHeader={true}>{S.ADMIN_PAGE.AdminCities.City}</AdminCitiesCityColumn>
                    <AdminCitiesStateColumn isHeader={true}>{S.ADMIN_PAGE.AdminCities.State}</AdminCitiesStateColumn>
                    <AdminCitiesPlacesColumn isHeader={true}>{S.ADMIN_PAGE.AdminCities.Places}</AdminCitiesPlacesColumn>
                    <AdminCitiesRecommendationsColumn isHeader={true}>
                        {S.ADMIN_PAGE.AdminCities.Recommendations}{' '}
                        {isDescending ? (
                            <AdminCitiesRecommendationsSortButton onClick={handleSort}>
                                <AdminCitiesRecommendationsAscendingSortIcon />
                            </AdminCitiesRecommendationsSortButton>
                        ) : (
                            <AdminCitiesRecommendationsSortButton onClick={handleSort}>
                                <AdminCitiesRecommendationsDescendingSortIcon />
                            </AdminCitiesRecommendationsSortButton>
                        )}
                    </AdminCitiesRecommendationsColumn>
                </AdminCitiesTableHeaderRow>
                {isLoadingCities ? (
                    <AdminCitiesLoadingContainer>
                        <CircularProgress />
                    </AdminCitiesLoadingContainer>
                ) : (
                    cities.map((cityItem: IAdminCity, index: number) => {
                        return (
                            <AdminCitiesTableRow key={index}>
                                <AdminCitiesImageColumn>
                                    <Image src={cityItem.imageUrlMobile} alt="city-image" />
                                </AdminCitiesImageColumn>
                                <AdminCitiesCityColumn>
                                    <Link
                                        href={`${R.ROUTE_ITEMS.city}/${cityItem.id}`}
                                        passHref={true}
                                        prefetch={false}
                                    >
                                        <AdminCityAnchor>
                                            <AdminCityText>{cityItem.city}</AdminCityText>
                                        </AdminCityAnchor>
                                    </Link>
                                </AdminCitiesCityColumn>
                                <AdminCitiesStateColumn>{cityItem.state}</AdminCitiesStateColumn>
                                <AdminCitiesPlacesColumn>{cityItem.venuesCount}</AdminCitiesPlacesColumn>
                                <AdminCitiesRecommendationsColumn>
                                    {cityItem.recommendationsCount}
                                </AdminCitiesRecommendationsColumn>
                            </AdminCitiesTableRow>
                        )
                    })
                )}
            </AdminCitiesTableContainer>
        </AdminCitiesContainer>
    )
}

export default AdminCities
