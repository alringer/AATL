import React from 'react'
import {
    SearchCouldNotFindButton,
    SearchCouldNotFindContainer,
    SearchCouldNotFindDescription,
    SearchCouldNotFindTitle,
} from './SearchCouldNotFind.style'

interface ISearchCouldNotFind {
    openSearchModal: () => void
}

const SearchCouldNotFind: React.FC<ISearchCouldNotFind> = ({ openSearchModal }) => {
    return (
        <SearchCouldNotFindContainer>
            <SearchCouldNotFindTitle>Couldn’t find it?</SearchCouldNotFindTitle>
            <SearchCouldNotFindDescription>
                If you’d like to recommend a place you couldn’t find, please do us a kindness and recommend it!
            </SearchCouldNotFindDescription>
            <SearchCouldNotFindButton onClick={openSearchModal}>RECOMMEND NEW PLACE</SearchCouldNotFindButton>
        </SearchCouldNotFindContainer>
    )
}

export default SearchCouldNotFind
