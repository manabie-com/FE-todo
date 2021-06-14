import SignInPage from "pages/sign-in"
import ToDoPage from "pages/todo"

import {RouteComponentProps} from "react-router-dom";

export type RouteType = {
    key:string,
    path: string,
    isAuth: boolean,
    exact?:boolean,
    comp:(props:RouteComponentProps)=> JSX.Element
}

export const ROUTE_PATH = {
    SIGN_IN: "/sign-in",
    TODO: "/todo"
}

export const routes:RouteType[] = [
    {
        key:"signin",
        path: ROUTE_PATH.SIGN_IN,
        exact:true,
        isAuth:false,
        comp: SignInPage
    },
    {
        key:"todo",
        path: ROUTE_PATH.TODO,
        comp: ToDoPage,
        isAuth:true
    }
];

