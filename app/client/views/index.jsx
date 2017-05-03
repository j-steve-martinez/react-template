'use strict'

/**
 * TODO: fix empty password on the back end
 * if it is blank don't save it.
 */

var React = require('react');
var ReactDOM = require('react-dom');

import About from './about.jsx';
import Config from './config.jsx'
import Header from './header.jsx';
import Login from './login.jsx';
import Signup from './signup.jsx';
import Start from './start.jsx';
import User from './user.jsx';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.router = this.router.bind(this);
        this.ajax = this.ajax.bind(this);
        this.parseAuth = this.parseAuth.bind(this);
        var auth = { _id: false, error: '' };
        this.state = { auth: auth };
    }
    router(route) {
        console.log('main router');
        console.log(route);
        /**
         * Routes:
         *  login
         *  signup
         *  user
         *  config
         *  logout
         */
        if (route === 'logout') {
            console.log('logging out');
            // var auth = { _id: false, error: null };
            // this.setState({ route: 'start', auth: auth });
            this.ajax({ route: 'logout' });
        } else {
            var auth = this.state.auth;
            auth.error = null;
            this.setState({ route: route, auth: auth });
        }
    }
    ajax(data) {
        // console.log('main ajax');
        // console.log(data);
        /**
         * Ajax to the server
         */
        var auth, book, books, url, URL, method, primus, contentType, route, reroute, header = {}, state = {};
        if (data.primus) {
            state.primus = data.primus;
            delete data.primus;
        }


        // books = this.state.books
        route = data.route;

        switch (route) {
            case 'signup':
                // console.log('route: signup');
                url = '/signup'
                header.method = 'POST';
                header.url = url;
                break;
            case 'update':
                // console.log('route: update');
                url = '/update'
                header.method = 'POST';
                header.url = url;
                break;
            case 'login':
                // console.log('route: user');
                url = '/login';
                header.method = 'POST';
                header.url = url;
                break;
            case 'logout':
                // console.log('route: user');
                url = '/logout';
                header.method = 'GET';
                header.url = url;
                break;
            default:
                break;
        }
        header.contentType = "application/json";
        header.dataType = 'json'
        header.data = JSON.stringify(data);
        console.log('ajax header');
        console.log(header);

        /**
         * Get data from server
         */
        $.ajax(header)
            .then(results => {
                console.log('AJAX .then');
                console.log(results);
                console.log(route);
                // console.log(results.user.email);
                // console.log(results.user.password);
                switch (route) {
                    case 'signup':
                        console.log('signup .then');
                        // if (results.user.error !== '') {
                        //     reroute = 'signup';
                        // } else {
                            reroute = 'user';
                        // }
                        auth = this.parseAuth(results.user);
                        // console.log(auth);
                        break;
                    case 'update':
                        console.log('update .then');
                        reroute = 'user';
                        // console.log(results.user);
                        auth = this.parseAuth(results.user);
                        // console.log(auth);
                        break;
                    case 'login':
                        console.log('login .then');
                        // if (results.user.error !== '') {
                        //     reroute = 'login';
                        // } else {
                            reroute = 'user';
                        // }
                        auth = this.parseAuth(results.user);
                        // console.log(auth);
                        break;
                    case 'logout':
                        console.log('logout .then');
                        reroute = 'start';
                        auth = this.parseAuth(results.user);
                        // console.log(auth);
                        break;
                }
                console.log('reroute..........');
                console.log(reroute);

                state.route = reroute;
                state.auth = auth;

                if (reroute !== undefined) {
                    this.setState(state);
                }
            })
            .fail(err => {
                console.log('AJAX .fail');
                console.log(err);
                var auth = this.state.auth;
                if (err.responseJSON) {
                    auth.error = err.responseJSON.error;
                    this.setState({ route: route, auth: auth });
                } else {
                    console.log('An unknown server error occured occured!');
                    // alert('An unknown server error occured occured!');
                    this.setState({ route: 'start' });
                }
            });
    }
    parseAuth(data) {
        console.log('parseAuth');
        console.log(data);
        console.log(Object.keys(data));
        if (data._id === false) {
            return data;
        } else {

            var auth, type, error, obj, id, name, email, city, state;
            Object.keys(data).forEach(key => {
                console.log(key);
                switch (key) {
                    case 'local':
                        type = 'local'
                        break;
                    case 'twitter':
                        type = 'twitter'
                        break;
                    case 'facebook':
                        type = 'facebook';
                        break;
                    case 'google':
                        type = 'google'
                        break;
                    default:
                        break;
                }
            });
            console.log('type');
            console.log(type);
            console.log(data[type]);
            data._id ? id = data._id : id = false;
            data.name ? name = data.name : name = '';
            data.city ? city = data.city : city = '';
            data.state ? state = data.state : state = '';
            data[type].email ? email = data[type].email : email = '';
            data.error ? error = data.error : error = null;

            obj = {
                _id: id,
                name: name,
                email: email,
                city: city,
                state: state,
                error: error
            }
            return obj;
        }
    }
    componentDidMount() {
        /**
         * Set the primus handler
         */
        // var primus = new Primus();
        // primus.on('data', data => {
        //     // console.log('primus data');
        //     // console.log(data);
        //     if (typeof data === 'object') {
        //         // console.log('primus got json');
        //     }
        // });
    }
    componentWillMount() {
        // console.log('Main componentWillMount');
        var apiUrl = window.location.origin + '/user/:id';
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).then(data => {
            console.log('comp will mount ajax.then');
            console.log(data);
            var route, auth = this.parseAuth(data.user);
            console.log(auth._id);
            auth._id ? route = 'user' : route = 'start'
            this.setState({ route: route, auth: auth })
        })
    }
    render() {
        console.log('Main render');
        console.log(this.state);
        var page, error, route;
        route = this.state.route;
        error = this.state.auth.error;
        if (error) {
            route = error.type;
        }
        switch (route) {
            case 'start':
                page = <Start />
                break;
            case 'login':
                page = <Login ajax={this.ajax} auth={this.state.auth} />
                break;
            case 'config':
                page = <Config ajax={this.ajax} auth={this.state.auth} />
                break;
            case 'signup':
                page = <Signup ajax={this.ajax} auth={this.state.auth} />
                break;
            case 'user':
                page = <User ajax={this.ajax} auth={this.state.auth} />
                break;
            case 'about':
                page = <About />
                break;
            default:
                console.log('showing default blank page');
                page = null
                break;
        }
        return (
            <div className="container" >
                <Header router={this.router} auth={this.state.auth} />
                {page}
            </div>
        )
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('content')
);
