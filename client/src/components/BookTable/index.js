import React from 'react'
import BookRow from './components/BookRow';

export default function BookTable({ books }) {
    return (
        <table className="w-3/5">
            <thead>
                <tr className="border-b border-grey-light mb-3">
                    <td>Cover</td>
                    <td>Book name</td>
                    <td>Authors</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>

                {books.map((book, i) => {
                    return <BookRow key={i} book={book} />
                })}
            </tbody>
        </table>
    )
}
