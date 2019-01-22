import React from 'react'
import PropTypes from 'prop-types';

Button.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.string.isRequired
}


export default function Button({ onClick, children, type }) {
    if (type === "submit") {
        return (
            <button
                className="rounded-lg bg-green-light hover:bg-white hover:text-green-light text-white px-4 py-2 font-bold border-solid hover:border-green-light"
                type="submit">
                {children}
            </button>)

    } else {
        return (
            <button
                className="rounded-lg bg-blue-light hover:bg-white text-white hover:text-blue-light px-4 py-2 font-bold border border-solid hover:border-blue-light"
                type="button"
                onClick={onClick}>
                {children}
            </button>
        )

    }

}

