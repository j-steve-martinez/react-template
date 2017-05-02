import React from 'react';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        var data = {
            isConfirm: false
        };
        this.state = data;
    }
    onClick(e) {
        console.log('onClick');
        console.log(e.target.id);
        e.preventDefault();

        var data = {
            isConfirm: true
        };

        function findPos(obj) {
            var curtop = 0;
            if (obj.offsetParent) {
                do {
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);
                return [curtop];
            }
        }
        window.scrollTo(0, findPos(document.getElementById("confirm")));
        this.setState(data);
    }
    onSubmit(e) {
        e.preventDefault();
        console.log('onSubmit');
        console.log(e.target.id);
        // this.props.ajax(data);

    }
    onConfirm(e) {
        e.preventDefault();
        console.log('onConfirm');
        console.log(e.target.id);
        this.setState({ isConfirm: false });
    }
    render() {
        console.log('User');
        console.log(this.props);
        console.log(this.state);
        var books, booksHtml, borrowed, borrowedHtml, requests, requestsHtml, name, email, city, state;

        /**
         * Make sure some books exist
         */
        if (this.state.isConfirm) {
            if (this.state.book.isAccept === true || this.state.book.isRequest) {
                confirm = (
                    <div className="alert alert-danger alert-dismissible" role="alert">
                        <strong>{this.state.book.title}</strong> has been requested or is on loan. Try again later.
                    </div>
                )
            } else {
                confirm = (
                    <form className="form-horizontal">
                        <label className='well text-danger' >Delete: {this.state.book.title}? </label>
                        <button onClick={this.onConfirm} name={this.state.book._id} id='delete' className="btn btn-success btn-lg" >Delete</button>
                        <button onClick={this.onConfirm} name={this.state.book._id} id='cancel' className="btn btn-danger btn-lg" >Cancel</button>
                    </form>
                )
            }
        } else {
            confirm = null;
        }
        var location, city, state;
        location = null;
        city = this.props.auth.city;
        state = this.props.auth.state;
        this.props.auth.name ? name = this.props.auth.name : name = null;
        this.props.auth.email ? email = this.props.auth.email : email = null;

        if (city && state) {
            location = city + ', ' + state;
        } else if (city) {
            location = city;
        } else if (state) {
            location = state;
        }

        return (
            <div className="jumbotron" >
                <div className="page-header">
                    <h1>{email} <small>{name}</small></h1>
                </div>
                <h3>{location}</h3>
            </div>
        )
    }
}