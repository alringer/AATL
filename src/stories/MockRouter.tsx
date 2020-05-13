import { RouterContext } from 'next/dist/next-server/lib/router-context'
import Router from 'next/router'
import React from 'react'

const MockRouter = (props) => {
    const routerOptions = props.routerOptions
    const router = {
        ...Router,
        ...routerOptions,
    }
    return <RouterContext.Provider value={router}>{props.children}</RouterContext.Provider>
}

export default MockRouter
