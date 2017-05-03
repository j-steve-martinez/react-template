import React from 'react';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = { message: null }
    }
    submit(e) {
        e.preventDefault();
        // console.log('Signup submit');
        // console.log(e.target.elements.email.value);
        // console.log(e.target.elements.password.value);
        // console.log(e.target.elements.confirm.value);
        var data, email, password, confirm;
        email = e.target.elements.email.value;
        password = e.target.elements.password.value;
        confirm = e.target.elements.confirm.value;
        if (password === confirm) {

            data = {
                route: 'signup',
                email: email,
                password: password,
            };
            this.props.ajax(data);
        } else {
            this.setState({ message: 'The passwords don\'t match!' });
        }

    }
    render() {
        console.log('Signup');
        console.log(this.props);
        var error;
        if (this.props.auth.error === null) {
            error = null;
        } else {
            error = (
                <div className="panel panel-danger">
                    <div className="panel-heading">Error: {this.props.auth.error.message}</div>
                </div>
            )
        }
        return (
            <div className='jumbotron'>
                <div className='page-header'>
                    <h1>Signup</h1>
                </div>
                <div className='text-danger' >
                    <h3>
                        {this.state.message}
                    </h3>
                </div>
                <form onSubmit={this.submit} >
                    {error}
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" id="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm">Confirm:</label>
                        <input type="password" className="form-control" id="confirm" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}