import React from 'react';
import { Mutation } from 'react-apollo';

import { LOGIN } from '../../queries';

import { validate } from '../../helpers/validate';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errors: {}
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }





    setToken = async (data) => {
        const { token } = data.login;
        await localStorage.setItem('token', `Bearer ${token}`);
        await this.props.history.push('/');
    }

    render() {
        const { email, password, errors } = this.state;
        return (<div className="center-horizontal">
            <Mutation mutation={LOGIN} ignoreResults={false} onCompleted={(data) => this.setToken(data)}>
                {(login, { error }) => (


                    <form onSubmit={(e) => {
                        e.preventDefault();
                        let errors = validate({ email, password })
                        this.setState({
                            errors
                        }, () => {
                            if (Object.keys(errors).length === 0) {
                                login({ variables: { email, password } })
                            }
                        })
                    }} className="form">
                        <h2 className="form-title">Sign in</h2>
                        <hr className="hr" />
                        {error && <p style={{ color: 'crimson', margin: "0.2em" }} >{error.message}</p>}
                        <div className="container">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input
                                className="form-input"
                                type='text'
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                            />
                            {errors.email && <p style={{ color: 'crimson', margin: "0.2em" }} >{errors.email}</p>}
                            <label className="form-label" htmlFor="password">Password</label>
                            <input
                                className="form-input"
                                type='password'
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                            />
                            {errors.password && <p style={{ color: 'crimson', margin: "0.2em" }} >{errors.password}</p>}
                            <button type="submit" className="form-button">Sign in</button>

                        </div>
                    </form>
                )}
            </Mutation>
        </div >
        )
    }
}


export default Login;