import { CircularProgress } from '@material-ui/core'
import Image from 'components/Image/Image'
import axios, { ADMIN_CITIES } from 'config/AxiosConfig'
import * as S from 'constants/StringConstants'
import React from 'react'
// import { CustomTextField } from 'style/TextField/TextField.style'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
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
    // AdminCitiesSearchButton,
    // AdminCitiesSearchContainer,
    AdminCitiesStateColumn,
    AdminCitiesTableContainer,
    AdminCitiesTableHeaderRow,
    AdminCitiesTableRow,
    AdminCityText,
} from './AdminCities.style'

interface IAdminCitiesProps extends IWithAuthInjectedProps {}

const AdminCities: React.FC<IAdminCitiesProps> = ({ getTokenConfig }) => {
    // TBD: Search
    // const [searchInput, setSearchInput] = React.useState('')
    const [cities, setCities] = React.useState<IAdminCity[]>([])
    const [isDescending, setDescending] = React.useState(true)
    const [isLoading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        const token = getTokenConfig()
        const config = {
            headers: {
                Authorization: token,
            },
        }
        axios
            .get(ADMIN_CITIES, config)
            .then((res) => {
                const sortedCities = sortCities(res.data, isDescending)
                setCities(sortedCities)
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false)
            })
    }, [])

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
                    <AdminCitiesImageColumn>{S.ADMIN_PAGE.AdminCities.Image}</AdminCitiesImageColumn>
                    <AdminCitiesCityColumn>{S.ADMIN_PAGE.AdminCities.City}</AdminCitiesCityColumn>
                    <AdminCitiesStateColumn>{S.ADMIN_PAGE.AdminCities.State}</AdminCitiesStateColumn>
                    <AdminCitiesPlacesColumn>{S.ADMIN_PAGE.AdminCities.Places}</AdminCitiesPlacesColumn>
                    <AdminCitiesRecommendationsColumn>
                        {S.ADMIN_PAGE.AdminCities.Recommendations}{' '}
                        {isDescending ? (
                            <AdminCitiesRecommendationsAscendingSortIcon onClick={handleSort} />
                        ) : (
                            <AdminCitiesRecommendationsDescendingSortIcon onClick={handleSort} />
                        )}
                    </AdminCitiesRecommendationsColumn>
                </AdminCitiesTableHeaderRow>
                {isLoading ? (
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
                                    <AdminCityText>{cityItem.city}</AdminCityText>
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

export default withAuth(AdminCities)
