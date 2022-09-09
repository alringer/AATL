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
    isSide?: boolean
    openSearchModal: () => void
}

const SearchCouldNotFind: React.FC<ISearchCouldNotFind> = ({ openSearchModal, fullWidth, isSide }) => {
    return (
        <SearchCouldNotFindContainer id={fullWidth ? 'full-width' : ''}>
            {!isSide && (
                <SearchCouldNotFindColumn>
                    <img src={LogoLady} alt="logo" />
                </SearchCouldNotFindColumn>
            )}
            <SearchCouldNotFindColumn giveMargin={!isSide && 1}>
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
