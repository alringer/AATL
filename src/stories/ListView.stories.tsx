import { storiesOf } from '@storybook/react'
import CategoriesListView from 'components/ListView/CategoriesListView'
import CitiesListView from 'components/ListView/CitiesListView'
import React from 'react'
import { mockCategoryList } from 'utilities/types/category'
import { mockProvinceList, mockStateList } from 'utilities/types/parentRegion'

export const CitiesData = {
    smallStateSmallProvince: {
        stateList: [...mockStateList.slice(0, 10)],
        provinceList: [...mockProvinceList.slice(0, 10)],
    },
    mediumStateSmallProvince: {
        stateList: [...mockStateList.slice(0, 50)],
        provinceList: [...mockProvinceList.slice(0, 10)],
    },
    largeStateSmallProvinces: {
        stateList: [...mockStateList],
        provinceList: [...mockProvinceList.slice(0, 10)],
    },
    extraLargeStateSmallProvinces: {
        stateList: [...mockStateList, ...mockStateList],
        provinceList: [...mockProvinceList.slice(0, 10)],
    },
}

export const CategoriesData = {
    small: {
        categoryList: [...mockCategoryList.slice(0, 10)],
    },
    medium: {
        categoryList: [...mockCategoryList.slice(0, 30)],
    },
    large: {
        categoryList: [...mockCategoryList],
    },
}

storiesOf('List View', module)
    .add('Cities: Small states & Small provinces', () => {
        return (
            <CitiesListView
                stateList={CitiesData.smallStateSmallProvince.stateList}
                provinceList={CitiesData.smallStateSmallProvince.provinceList}
            />
        )
    })
    .add('Cities: Medium states & Small provinces', () => {
        return (
            <CitiesListView
                stateList={CitiesData.mediumStateSmallProvince.stateList}
                provinceList={CitiesData.mediumStateSmallProvince.provinceList}
            />
        )
    })
    .add('Cities: Large states & Small provinces', () => {
        return (
            <CitiesListView
                stateList={CitiesData.largeStateSmallProvinces.stateList}
                provinceList={CitiesData.largeStateSmallProvinces.provinceList}
            />
        )
    })
    .add('Cities: Extra large states & Small provinces', () => {
        return (
            <CitiesListView
                stateList={CitiesData.extraLargeStateSmallProvinces.stateList}
                provinceList={CitiesData.extraLargeStateSmallProvinces.provinceList}
            />
        )
    })
    .add('Categories: Small List', () => {
        return <CategoriesListView categoryList={CategoriesData.small.categoryList} />
    })
    .add('Categories: Medium List', () => {
        return <CategoriesListView categoryList={CategoriesData.medium.categoryList} />
    })
    .add('Categories: Large List', () => {
        return <CategoriesListView categoryList={CategoriesData.large.categoryList} />
    })
