import React from 'react'

const Init = (props) => {
    const { children } = props

    return (
        <React.Fragment>
            { init && (children) }
        </React.Fragment>
    )
}

export default Init