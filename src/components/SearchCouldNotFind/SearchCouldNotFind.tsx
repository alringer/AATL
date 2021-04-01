import * as S from 'constants/StringConstants'
import React from 'react'
import {
    SearchCouldNotFindButton,
    SearchCouldNotFindContainer,
    SearchCouldNotFindDescription,
    SearchCouldNotFindTitle,
} from './SearchCouldNotFind.style'

interface ISearchCouldNotFind {
    fullWidth?: boolean
    openSearchModal: () => void
}

const SearchCouldNotFind: React.FC<ISearchCouldNotFind> = ({ openSearchModal, fullWidth }) => {
    return (
        <SearchCouldNotFindContainer id={fullWidth ? 'full-width' : ''}>
            <SearchCouldNotFindTitle>{S.COULD_NOT_FIND.Title}</SearchCouldNotFindTitle>
            <SearchCouldNotFindDescription>{S.COULD_NOT_FIND.Description}</SearchCouldNotFindDescription>
            <SearchCouldNotFindButton onClick={openSearchModal}>
                {S.BUTTON_LABELS.RecommendNewPlace}
            </SearchCouldNotFindButton>
        </SearchCouldNotFindContainer>
    )
}

export default SearchCouldNotFind
