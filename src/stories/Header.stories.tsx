import { storiesOf } from '@storybook/react'
import React from 'react'
import Header from '../sections/Header/Header'
import MockRouter from './MockRouter'

const defaultRouterOptions = {
    pathname: '/',
    route: '/',
    asPath: '/',
}

const searchRouterOptions = {
    pathname: '/cities',
    route: '/cities',
    asPath: '/cities',
}

storiesOf('Header', module)
    .add('Default', () => {
        return (
            <MockRouter routerOptions={defaultRouterOptions}>
                <Header />
            </MockRouter>
        )
    })
    .add('Variant - With Search', () => {
        return (
            <MockRouter routerOptions={searchRouterOptions}>
                <Header />
            </MockRouter>
        )
    })
