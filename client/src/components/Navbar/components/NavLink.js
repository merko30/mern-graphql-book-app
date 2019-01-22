import React from 'react'
import { Link } from 'react-router-dom';

export default function NavLink({ to, children }) {
    return (
        <li className="list-reset">
            <Link to={to} className="p-3 md:p-5 font-bold text-teal hover:text-teal-dark no-underline">{children}</Link>
        </li>
    )
}
