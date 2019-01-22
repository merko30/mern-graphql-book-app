
import React from 'react'
import shorten from '../../../helpers/shortenAuthorName';

export default function BookRow({ book: { cover, title, status, authors } }) {
    return (
        <tr className="py-2">
            <td className="w-1/6 pt-3"><img src={cover} alt={title} className="h-14 w-10" /></td>
            <td className="w-1/4 pt-3">{title}</td>
            <td className="w-1/2 py-10 flex flex-col">{authors.map(a => shorten(a))}</td>
            <td className="w-1/4 pt-3">{status}</td>
        </tr>
    )
}
