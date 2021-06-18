import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TodoContext } from '@store/reducer';
import Styles from './signIn.module.css';
import Service from '@service/index';
import { Input, Button } from '@components/index';
import { setToken } from '@store/actions';

const SignInPage = () => {
  const [{}, dispatch] = useContext(TodoContext);
  const [form, setForm] = useState({
    userId: '',
    password: '',
  });
  const history = useHistory();
  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await Service.signIn(form.userId, form.password);
    dispatch(setToken(resp));
    history.push('/');
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isDisableButton = () => {
    const { password, userId } = form;
    if (Boolean(password) && Boolean(userId)) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className={Styles.container}>
      <form onSubmit={signIn}>
        <fieldset className={Styles.fieldSet}>
          <legend>firstUser - example</legend>
          <Input
            labelName='Username'
            id='user_id'
            value={form.userId}
            onChange={onChangeField}
            name='userId'
            placeholder='Name'
          />
          <Input
            labelName='Password'
            id='password'
            value={form.password}
            onChange={onChangeField}
            name='password'
            type='password'
            placeholder='Password'
          />
          <Button
            disabled={isDisableButton()}
            className={Styles.btnSignIn}
            type='submit'
          >
            Sign in
          </Button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignInPage;
