import { Dispatch } from 'react';

export type Context<S, A> = {
	state: S;
	dispatch: Dispatch<A>;
};
