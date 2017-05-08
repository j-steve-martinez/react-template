import React from 'react';
import Tweet from './tweet.jsx';

export default class Start extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log('Start props');
        console.log(this.props);
        var welcome, name;
        if (this.props.auth._id !== false) {
            this.props.auth.name ? name = this.props.auth.name : name = this.props.auth.email;
            welcome = 'Welcome Back';
            name = name;
        } else {
            welcome = "Welcome";
            name = "Please Login or Register.";
        }
        console.log(welcome);
        return (
            <div className="jumbotron" >
                <div className='page-header'>
                    <h1>{welcome}</h1>
                    <h2>{name}</h2>
                </div>
                <h3>Tweet your friends!</h3>
                <Tweet />
            </div>
        );
    }
}