import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';



class Home extends React.Component {

    componentDidMount() {
        console.log('here')
        if (localStorage.getItem('token')) {
            history.push('/dashboard');
        }
    }


    render() {
        return (
            <div>
                <div className="jumbo center">
                    <h1>BookApp</h1>
                    <h3>Hi, BookApp helps you track your bookshelves</h3>
                    <h3>To get started, <Link to="/register" className="underline">sign in</Link></h3>
                </div>

            </div>
        )
    }

}

export default Home;
