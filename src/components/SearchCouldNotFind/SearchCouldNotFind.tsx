import LogoLady from 'assets/LFB-Lady.png'
import * as S from 'constants/StringConstants'
import React from 'react'
import {
    SearchCouldNotFindButton,
    SearchCouldNotFindColumn,
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
            <SearchCouldNotFindColumn>
                <img src={LogoLady} alt="logo" />
            </SearchCouldNotFindColumn>
            <SearchCouldNotFindColumn giveMargin={1}>
                <SearchCouldNotFindTitle>{S.COULD_NOT_FIND.Title}</SearchCouldNotFindTitle>
                <SearchCouldNotFindDescription>{S.COULD_NOT_FIND.Description}</SearchCouldNotFindDescription>
                <SearchCouldNotFindButton onClick={openSearchModal}>
                    {S.BUTTON_LABELS.RecommendNewPlace}
                </SearchCouldNotFindButton>
            </SearchCouldNotFindColumn>
        </SearchCouldNotFindContainer>
    )
}

export default SearchCouldNotFind
