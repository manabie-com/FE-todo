import React, {Component} from 'react';
import Service from '../service';

export default class HeaderComponent extends Component<any, {}> {
  async signOut() {
    const result = window.confirm('Do you really want to sign out this awesome application?');

    if (result) {
      await Service.signOut();
      this.props.history.push('/login');
    }
  };

  render() {
    return (
      <header style={{height: '65px'}}>
        <div style={{
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: 'white',
        }}>
          <div className="container small-container" style={{padding: '7px 15px', textAlign: 'right'}}>
            <img src="https://hb.teamcancode.com/magical-avatar.4c7ae77fcfe37f85b129.jpg"
                 alt="HB"
                 title="HB"
                 width="45"
                 height="45"
                 style={{verticalAlign: 'middle', marginRight: '15px'}}/>
            <p style={{display: 'inline-block', padding: 0, margin: '0 15px 0 0', lineHeight: '50px'}}>Welcome HB</p>
            <button type="button" onClick={() => this.signOut()}>Sign out</button>
          </div>
        </div>
      </header>
    );
  }
}
