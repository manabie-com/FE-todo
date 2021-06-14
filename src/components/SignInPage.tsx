import React, {Component} from 'react';
import Service from '../service';

export default class SignInPage extends Component<any, { form: any, errorMessage: string }> {
  constructor(props: any) {
    super(props);

    this.state = {
      errorMessage: '',
      form: {
        userId: '',
        password: '',
      },
    };
  }

  async signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await Service.signIn(this.state.form.userId, this.state.form.password);
      this.setState({errorMessage: ''});
      this.props.history.push('/todo');
    } catch (errorMessage) {
      /* Missing error message after login failed
         FIXME: Add errorMessage state
       */
      this.setState({errorMessage});
    }
  }

  onChangeField(e: React.ChangeEvent<HTMLInputElement>) {
    e.persist();
    this.setState({form: {...this.state.form, [e.target.name]: e.target.value}});
  };

  render() {
    return (
      <div style={{
        background: 'white',
        padding: '30px 30px 60px 30px',
        position: 'fixed',
        textAlign: 'left',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        width: '70%',
        maxWidth: '420px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <form onSubmit={(e: any) => this.signIn(e)}>
          <h1 style={{textAlign: 'center'}}>Login</h1>

          <label style={{display: 'block'}} htmlFor="userId">
            <span>User id:</span>
            <input
              id="userId"
              name="userId"
              value={this.state.form.userId}
              style={{marginTop: 7}}
              onChange={(e: any) => this.onChangeField(e)}
              placeholder="Enter your ID"
            />
          </label>

          <label style={{display: 'block', marginTop: '15px'}} htmlFor="password">
            <span>Password:</span>
            <input
              id="password"
              name="password"
              type="password"
              style={{marginTop: 7}}
              value={this.state.form.password}
              onChange={(e: any) => this.onChangeField(e)}
              placeholder="Enter your password"
            />
          </label>

          <button type="submit" style={{marginTop: 30, display: 'block', width: '100%'}}
                  disabled={!this.state.form.userId || !this.state.form.password}>
            Sign in
          </button>

          {
            /* Missing error message after login failed
               FIXME: Add errorMessage state
             */
          }
          <div style={{color: '#dc3545'}}>
            {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : ''}
          </div>
        </form>
      </div>
    );
  }
}
