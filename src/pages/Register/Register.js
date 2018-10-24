import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { REGISTER } from '../../queries';

import { validate } from '../../helpers/validate';

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            errors: {}
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })
    }

    redirectPage = () => {
        this.props.history.push('/login');
    }


    render() {
        const { username, email, password, errors } = this.state;
        return (
            <Mutation mutation={REGISTER} onCompleted={this.redirectPage}>
                {(register, { data, error }) => (

                    <div className="center my2">

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            let errors = validate({ username, email, password })
                            this.setState({
                                errors
                            }, () => {
                                if (Object.keys(errors).length === 0) {
                                    register({ variables: { username: username, email: email, password: password } })
                                }
                            })
                        }} className="form">
                            <h2 className="form-title">Sign up</h2>
                            <hr className="hr" />
                            {error && <p style={{ color: 'crimson', margin: '0.2em' }}>{error.message}</p>}
                            <div className="container">
                                <label className="form-label" htmlFor="username">Username</label>
                                <input
                                    className="form-input"
                                    type='text'
                                    name="username"
                                    value={username}
                                    onChange={this.handleChange}
                                />
                                {errors.username && <p style={{ color: 'crimson', margin: '0.2em' }}>{errors.username}</p>}
                                <label className="form-label" htmlFor="email">Email</label>
                                <input
                                    className="form-input"
                                    type='text'
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                />
                                {errors.email && <p style={{ color: 'crimson', margin: '0.2em' }}>{errors.email}</p>}
                                <label className="form-label" htmlFor="password">Password</label>
                                <input
                                    className="form-input"
                                    type='password'
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                />
                                {errors.password && <p style={{ color: 'crimson', margin: '0.2em' }}>{errors.password}</p>}
                                <button type="submit" className="form-button">Sign up</button>
                            </div>
                        </form>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default Register;