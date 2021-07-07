import React from 'react'

export default function IconBtn({
    onClick,
    icon
}) {
    return (
        <button
            className='icon-btn btn border'
            onClick={onClick}>
            <i className={icon}></i>
        </button>
    )
}
