import { storiesOf } from '@storybook/react'
import SearchWorkBench from 'components/SearchWorkBench/SearchWorkBench'

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
            handleLFBSearch={() => {}}
            handleYelpSearch={() => {}}
            openSearchModal={() => {}}
            currentYelpPageCount={0}
            currentYelpPage={0}
            currentYelpTotal={0}
            inputCategoryID={null}
            inputPage={0}
            inputPageCount={0}
            inputTotal={0}
            currentYelpOffset={0}
            currentYelpLimit={0}
            searchYelpResults={[]}
            isRobust={false}
            isLFBLoading={false}
            isYelpLoading={false}
        />
    )
})
