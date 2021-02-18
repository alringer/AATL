import { storiesOf } from '@storybook/react'
import SearchWorkBench from 'components/SearchWorkBench/SearchWorkBench'
import React from 'react'

export const SearchFullData = {
    default: {
      place: 'Sushi',
      address: '1234 Where St., San Diego, CA',
    },
}

const handleSearch = (place?: string, address?: string) => {}

storiesOf('Search Page', module).add('Search Panel', () => {
    return (
        <SearchWorkBench
            inputPlace={null}
            inputAddress={null}
            inputLat={null}
            inputLng={null}
            inputSort={null}
            searchResults={[]}
            topCategories={[]}
            handleSearch={() => {}}
            openSearchModal={() => {}}
            inputCategoryID={null}
        />
    )
})

