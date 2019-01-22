import React from 'react'
import { Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';

import history from '../../history';

import NavLink from './components/NavLink';

class Navbar extends React.Component {

    handleLogout = () => {
        const { client } = this.props;
        localStorage.clear();
        client.clearStore().then(() => {
            history.push('/login')
        }).catch(err => console.log(err))
    }


    render() {
        return (
            <div
                ref="nav"
                className="mx-2 mt-2 w-full flex justify-between items-center flex-row mb-10">

                <h1><Link to="/" className="inline my-10 no-underline text-orange">BookApp</Link></h1>

                <ul className="flex items-center pl-0 justify-start">

                    {!localStorage.getItem('token') && <NavLink to="/register">Register</NavLink>}
                    {!localStorage.getItem('token') && <NavLink to="/login">Login</NavLink>}

                    {localStorage.getItem('token') && <NavLink to="/search">Search books</NavLink>}
                    {localStorage.getItem('token') &&
                        <button
                            className="hover:text-teal-dark no-underline text-teal bg-gray-light font-bold m-3"
                            onClick={this.handleLogout}>Logout</button>
                    }

                </ul>

            </div>
        );
    }
}

export default withApollo(Navbar);