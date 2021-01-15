import React from 'react'
import Nav from '../Nav'
import "./index.scss"

const AppShell = ({children}) => {
    return (
        <div className="AppShellWrapper">
            <Nav />
            <div className="ViewWrapper">
                {children}
            </div>
        </div>
    )
}

export default AppShell;