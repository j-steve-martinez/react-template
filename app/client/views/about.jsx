import React from 'react';

export default class About extends React.Component {
  render() {
    var fccProjectURL, fccProjectName, appName, herokuURL, githubURL;
    fccProjectName = 'React Login Template';
    fccProjectURL = "#";
    appName = 'React Login Template';
    herokuURL = "#";
    githubURL = "https://github.com/j-steve-martinez/react-template";

    return (
      <div className='jumbotron'>
        <div className='page-header'>
          <h1>{appName}</h1>
        </div>
        <div id='about-body' >
          It is a full stack web application that uses:
          <ul>
            <li>
              <a href="https://www.mongodb.com/" target="_blank">Database: mongoDB </a>
            </li>
            <li>
              <a href="https://nodejs.org" target="_blank">Server: Node.js </a>
            </li>
            <li>
              <a href="https://facebook.github.io/react/" target="_blanks">Views: React.js </a>
            </li>
            <li>
              <a href="http://getbootstrap.com" target="_blank">Stylesheets: Bootstrap </a>
            </li>
          </ul>
          <span id='warning'>
            This application is for educational purposes only.  Any and all data may be removed at anytime without warning.
          </span>
        </div>
        <div id='about-footer' className='text-center' >
          <span>
            <a className='link' href="https://github.com/j-steve-martinez" target="_blank">
              J. Steve Martinez
            </a>
          </span>
          <span> | </span>
          <span>
            <a className='link' href={githubURL} target="_blank">
              Github
            </a>
          </span>
        </div>
      </div>
    )
  }
}