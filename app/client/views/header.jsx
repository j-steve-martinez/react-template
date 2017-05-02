import React from 'react';
// import Login from './login.jsx';
// import Logout from './logout.jsx';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.cH = this.cH.bind(this);
        this.state = {appName: 'Template'}
    }
    cH(e) {
        // console.log('Header cH');
        // console.log(e.target.id);
        e.preventDefault();
        this.props.router(e.target.id);
    }
    render() {
        // console.log('header props');
        // console.log(this.props);
        /**
         * Login links should be:
         *  All Books
         *  My Books
         *  Configure glyphicon
         *  Logout glyphicon
         */
        var logout = (
            <ul className="nav navbar-nav navbar-right" >
                <li><a id="user" onClick={this.cH} href="#"><span className="glyphicon glyphicon-user"></span> My Account</a></li>
                <li><a id="config" onClick={this.cH} href="#"><span className="glyphicon glyphicon-cog"></span> Configure</a></li>
                <li><a id="logout" onClick={this.cH} href="#"><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
                <li><a id="about" onClick={this.cH} href="#"><span className="glyphicon glyphicon-question-sign"></span> About</a></li>
            </ul>
        );
        var login = (
            <ul className="nav navbar-nav navbar-right" >
                <li><a id="signup" onClick={this.cH} href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                <li><a id="login" onClick={this.cH} href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                <li><a id="about" onClick={this.cH} href="#"><span className="glyphicon glyphicon-question-sign"></span> About</a></li>
            </ul>
        );
        var navs, auth = this.props.auth;
        // console.log('auth');
        // console.log(auth);
        // console.log('typeof auth._id');
        // console.log(typeof auth._id);
        var myHeader;
        if (auth._id !== false) {
            // console.log('is logged in');
            navs = logout;
        } else {
            // console.log('not logged in');
            navs = login;
        }
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a id="start" onClick={this.cH} className="navbar-brand" href="#">{this.state.appName}</a>
                    </div>
                    {navs}
                </div>
            </nav>
        );
    }
}