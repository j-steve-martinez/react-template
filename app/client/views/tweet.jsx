import React from 'react';

export default class Tweet extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var url = window.location.href;
        var elem = document.getElementById('twit-share');
        var data = {};
        data.text = 'Hello World!';
        data.size = 'large';
        twttr.widgets.createShareButton(url, elem, data);
    }
    render() {
        return <a id='twit-share'></a>
    }
}
