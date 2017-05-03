import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
    submit(e) {
        e.preventDefault();
        // console.log('login submit');
        // console.log(e.target.elements);
        // console.log(e.target.elements.email.value);
        // console.log(e.target.elements.password.value);
        var data, email, password;
        email = e.target.elements.email.value;
        password = e.target.elements.password.value;
        data = {
            route: 'login',
            email: email,
            password: password,
        };
        this.props.ajax(data);

    }
    render() {
        // console.log('Login');
        // console.log(this.props);
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
            <div className='jumbotron' >
                <div className='page-header'>
                    <h1>Login</h1>
                </div>
                <form onSubmit={this.submit}>
                    {error}
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" id="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div className='page-header' >
                    <h2>Social</h2>
                </div>

                <a href='/auth/twitter'>
                    <img className='social-icon' src='./public/img/Twitter.png' />
                </a>
                <a href='/auth/google'>
                    <img className='social-icon' src='./public/img/Google+.png' />
                </a>
                <a href='/auth/facebook'>
                    <img className='social-icon' src='./public/img/Facebook.png' />
                </a>
            </div>
        )
    }
}