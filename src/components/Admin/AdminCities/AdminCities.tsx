import PlaceImage from 'assets/mock-images/sushi_image.png'
import Image from 'components/Image/Image'
import React from 'react'
import { CustomTextField } from 'style/TextField/TextField.style'
import { AdminMenuPageSubTitle, AdminMenuPageTitle } from '../AdminShared.style'
import {
    AdminCitiesCityColumn,
    AdminCitiesContainer,
    AdminCitiesImageColumn,
    AdminCitiesPlacesColumn,
    AdminCitiesRecommendationsColumn,
    AdminCitiesRecommendationsSortIcon,
    AdminCitiesSearchButton,
    AdminCitiesSearchContainer,
    AdminCitiesStateColumn,
    AdminCitiesTableContainer,
    AdminCitiesTableHeaderRow,
    AdminCitiesTableRow,
    AdminCityText,
} from './AdminCities.style'

const mockData = [
    {
        imgSrc: PlaceImage,
        city: 'Atlanta',
        state: 'Georgia',
        places: 30,
        recommendations: 76,
    },
    {
        imgSrc: PlaceImage,
        city: 'Atlanta City',
        state: 'New Jersey',
        places: 140,
        recommendations: 76,
    },
    {
        imgSrc: PlaceImage,
        city: 'Austin',
        state: 'Texas',
        places: 1770,
        recommendations: 76,
    },
    {
        imgSrc: PlaceImage,
        city: 'Boston',
        state: 'Massachusetts',
        places: 1770,
        recommendations: 76,
    },
    {
        imgSrc: PlaceImage,
        city: 'Charleston',
        state: 'South Carolina',
        places: 1770,
        recommendations: 76,
    },
    {
        imgSrc: PlaceImage,
        city: 'Charlotte',
        state: 'North Carolina',
        places: 1770,
        recommendations: 76,
    },
    {
        imgSrc: PlaceImage,
        city: 'Chicago',
        state: 'Illinois',
        places: 1770,
        recommendations: 76,
    },
]

interface IAdminCitiesProps {}

const AdminCities: React.FC<IAdminCitiesProps> = () => {
    const [searchInput, setSearchInput] = React.useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }

    return (
        <AdminCitiesContainer>
            <AdminMenuPageTitle>Cities</AdminMenuPageTitle>
            <AdminMenuPageSubTitle>
                This is the list of supported cities. You may access them directly from here.
            </AdminMenuPageSubTitle>
            <AdminCitiesSearchContainer>
                <CustomTextField
                    value={searchInput}
                    placeholder="Search cities"
                    onChange={handleChange}
                    variant="outlined"
                />
                <AdminCitiesSearchButton>SEARCH</AdminCitiesSearchButton>
            </AdminCitiesSearchContainer>
            <AdminCitiesTableContainer>
                <AdminCitiesTableHeaderRow>
                    <AdminCitiesImageColumn>Image</AdminCitiesImageColumn>
                    <AdminCitiesCityColumn>City</AdminCitiesCityColumn>
                    <AdminCitiesStateColumn>State</AdminCitiesStateColumn>
                    <AdminCitiesPlacesColumn>Places</AdminCitiesPlacesColumn>
                    <AdminCitiesRecommendationsColumn>
                        Recommendations <AdminCitiesRecommendationsSortIcon />
                    </AdminCitiesRecommendationsColumn>
                </AdminCitiesTableHeaderRow>
                {mockData.map((cityItem: any) => {
                    return (
                        <AdminCitiesTableRow>
                            <AdminCitiesImageColumn>
                                <Image src={cityItem.imgSrc} alt="city-image" />
                            </AdminCitiesImageColumn>
                            <AdminCitiesCityColumn>
                                <AdminCityText>{cityItem.city}</AdminCityText>
                            </AdminCitiesCityColumn>
                            <AdminCitiesStateColumn>{cityItem.state}</AdminCitiesStateColumn>
                            <AdminCitiesPlacesColumn>{cityItem.places}</AdminCitiesPlacesColumn>
                            <AdminCitiesRecommendationsColumn>
                                {cityItem.recommendations}
                            </AdminCitiesRecommendationsColumn>
                        </AdminCitiesTableRow>
                    )
                })}
            </AdminCitiesTableContainer>
        </AdminCitiesContainer>
    )
}

export default AdminCities
