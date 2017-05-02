import React from 'react';

export default class Config extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = { message: null }
    }
    submit(e) {
        e.preventDefault();
        // console.log('Config submit');
        // console.log(e.target.elements);
        // console.log(e.target.elements.name.value);
        // console.log(e.target.elements.email.value);
        // console.log(e.target.elements.city.value);
        // console.log(e.target.elements.state.value);
        var data, id, name, email, city, state, password, confirm;
        id = this.props.auth._id;
        name = e.target.elements.name.value;
        email = e.target.elements.email.value;
        city = e.target.elements.city.value;
        state = e.target.elements.state.value;
        password = e.target.elements.password.value;
        confirm = e.target.elements.confirm.value;

        if (password === confirm) {

            data = {
                route: 'update',
                id: id,
                name: name,
                email: email,
                city: city,
                state: state,
                password: password
            };

            // console.log(data);
            this.props.ajax(data);

        } else {
            function findPos(obj) {
                var curtop = 0;
                if (obj.offsetParent) {
                    do {
                        curtop += obj.offsetTop;
                    } while (obj = obj.offsetParent);
                    return [curtop];
                }
            }
            window.scrollTo(0, findPos(document.getElementById("error")));
            this.setState({ message: 'The passwords don\'t match!' });
        }


    }
    render() {
        // console.log('Config');
        // console.log(this.props);
        var name, email, city, state;
        name = this.props.auth.name;
        email = this.props.auth.email;
        city = this.props.auth.city;
        state = this.props.auth.state;

        return (
            <div className='jumbotron'>
                <div className='page-header'>
                    <h1>Update Your Profile</h1>
                </div>
                <div className='text-danger' >
                    <h3 id='error'>
                        {this.state.message}
                    </h3>
                </div>
                <form onSubmit={this.submit} >
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control bg-info" id="email" value={email} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" id="name" defaultValue={name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input type="text" className="form-control" id="city" defaultValue={city} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <input type="text" className="form-control" id="state" defaultValue={state} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm">Confirm:</label>
                        <input type="password" className="form-control" id="confirm" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}