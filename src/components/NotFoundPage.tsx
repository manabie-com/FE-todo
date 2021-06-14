import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class NotFoundPage extends Component<{}, {}> {
  render() {
    return (
      <div className="container" style={{textAlign: 'center'}}>
        <h1>Page Not Found</h1>
        <Link to="/">Return to homepage</Link>
      </div>
    );
  }
}
