
import React from 'react'
import PropTypes from 'prop-types';

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    id: PropTypes.any,
    type: PropTypes.string.isRequired
}

export default function TextInput({ name, label, id, placeholder, onChange, value, type }) {
    return (
        <div className="my-2">
            {label && <label htmlFor={name} className="block text-grey-darkest uppercase">{label}</label>}
            <input
                className="block w-64 p-2 my-1 shadow-inner bg-grey-lightest rounded-lg"
                id={id}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value} />
        </div>
    )
}
