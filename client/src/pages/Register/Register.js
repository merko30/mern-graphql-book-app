import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import register from '../../graphql/mutations/register';

import { validate } from '../../helpers/validate';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Error from '../../components/Error';

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
            <Mutation mutation={register} onCompleted={this.redirectPage}>
                {(register, { error }) => (

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
                            {error && <Error error={error.message} />}
                            <div className="container">

                                <TextInput
                                    label="Username"
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={this.handleChange}
                                />
                                {errors.username && <Error error={error.username} />}

                                <TextInput
                                    label="Email"
                                    name="email"
                                    type="text"
                                    value={email}
                                    onChange={this.handleChange}
                                />
                                {errors.email && <Error error={error.email} />}
                                <TextInput
                                    label="Password"
                                    type='password'
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                />
                                {errors.password && <Error error={error.password} />}
                                <Button type="submit">Sign up</Button>
                            </div>
                        </form>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default Register;