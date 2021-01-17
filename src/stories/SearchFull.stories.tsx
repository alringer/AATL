import { storiesOf } from '@storybook/react'
import SearchFull from 'components/SearchFull/SearchFull'
import React from 'react'

export const SearchFullData = {
  default: {
    place: 'Sushi',
    address: '1234 Where St., San Diego, CA',
  },
}

const handleSearch = (place: string, address: string) => { }

storiesOf('Full Search', module)
  .add('Default', () => {
    return (
      <SearchFull
        inputPlace={null}
        inputAddress={null}
        inputLat={null}
        inputLng={null}
        handleSearch={() => { }}
        inputCategoryID={null}
      />
    )
  })
  .add('With Inputs', () => {
    return (
      <SearchFull
        inputPlace={"Earl's Sandwich"}
        inputAddress={'San Diego, CA, US'}
        inputLat={'32.7157'}
        inputLng={'-117.161'}
        handleSearch={() => { }}
        inputCategoryID={null}
      />
    )
  })
