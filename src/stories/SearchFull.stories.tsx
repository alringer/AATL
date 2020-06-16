import { storiesOf } from '@storybook/react'
import SearchFull from 'components/SearchFull/SearchFull'
import React from 'react'

export const SearchFullData = {
    default: {
        place: 'Sushi',
        address: '1234 Where St., San Diego, CA',
    },
}

const handleSearch = (place: string, address: string) => {}

storiesOf('Full Search', module)
    .add('Default', () => {
        return <SearchFull inputPlace={''} inputAddress={''} handleSearch={handleSearch} />
    })
    .add('With Inputs', () => {
        return (
            <SearchFull
                inputPlace={SearchFullData.default.place}
                inputAddress={SearchFullData.default.address}
                handleSearch={handleSearch}
            />
        )
    })
