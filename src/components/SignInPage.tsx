/* eslint-disable jsx-a11y/alt-text */
import React, {useState} from 'react';

import {useHistory} from 'react-router-dom'
import Service from '../service';
import userIcon from '../assets/ic-user.png';
import lockIcon from '../assets/ic-lock.png';

const SignInPage = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const [err, setErr] = useState(false);

    const history = useHistory();

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErr(false);
        try {
            const resp = await Service.signIn(form.userId, form.password)
            console.log('resp', resp);
            // use JSON.stringify() to sure it is string. 
            localStorage.setItem('token', resp)
            history.push('/todo')
        } catch (error) {
            setErr(true);
        }
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="align-items-center wrap-box p-4">
            <div className="md-p-4">
                <h1 className="align-items-center-title">Login</h1>
                <p className="color-label">Sign In to your account</p>
                <form onSubmit={signIn} className="m-t-15">
                    <label htmlFor="userId" className="align-items-center-group-input m-t-15">
                        <div className="align-items-center-group-input-img">
                            <img src={userIcon} className="align-items-center-group-input-icon" />
                        </div>
                        <input
                            id="user_id"
                            name="userId"
                            placeholder="Username"
                            value={form.userId}
                            className="input-none"
                            onChange={onChangeField}
                        />
                    </label>
                    <label htmlFor="password" className="align-items-center-group-input m-t-15">
                        <div className="align-items-center-group-input-img">
                            <img src={lockIcon} className="align-items-center-group-input-icon" />
                        </div>
                        <input
                            id="password"
                            name="password"
                            placeholder="Password"
                            type="password"
                            className="input-none"
                            value={form.password}
                            onChange={onChangeField}
                        />
                    </label>
                    <br />
                    {err && <div className="align-items-center-error m-t-15 md-p-4">
                        <span>* Username or Password wrong!!!</span>
                    </div>}
                    <div className="align-items-center-button" >
                        <button type="submit" className="btn btn-submit" style={{marginTop: 12}}>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;