import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import XIcon from '../../components/icons/XIcon';
import { InputField } from '../../components/InputField';
import { routes } from '../../config/routes';
import { useAuth } from '../../context/authContext';
import Service from '../../service';
import { login } from '../../store/actions/authActions';
import useQuery from '../../utils/hooks/useQuery';
interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = (props) => {
	const [form, setForm] = useState({
		userId: '',
		password: '',
	});
	const [errMsg, setErrMsg] = useState('');
	const query = useQuery();
	const history = useHistory();
	const { dispatch } = useAuth();

	const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const returnPath = query.get('path');
			const resp = await Service.signIn(form.userId, form.password);
			dispatch(login(resp));
			history.push(returnPath || routes.todo.index);
		} catch (err) {
			setErrMsg(err);
		}
	};

	const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<>
			<Header title="Mana-do" />
			<form className="App__space" onSubmit={signIn}>
				{errMsg && (
					<div className="App__error">
						<XIcon solid />
						<span>{errMsg}</span>
					</div>
				)}
				<InputField
					id="user_id"
					label="Username"
					name="userId"
					type="text"
					autoComplete="username"
					required
					value={form.userId}
					onChange={onChangeField}
				/>
				<InputField
					label="Password"
					name="password"
					type="password"
					autoComplete="current-password"
					required
					value={form.password}
					onChange={onChangeField}
				/>

				<button
					type="submit"
					className="App__btn App__btn--primary App__btn--block"
				>
					Sign in
				</button>
			</form>
		</>
	);
};

export default LoginPage;
