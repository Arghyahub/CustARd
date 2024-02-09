import { NavigateFunction } from "react-router-dom";

const BACKEND = import.meta.env.VITE_BACKEND;
import {
    UserDataType
} from "@/types/types";
import { SetterOrUpdater } from "recoil";

interface loginRespType {
    success: boolean,
    msg: string,
    token?: string,
    err?: string,
    valid?: boolean
}

interface ValidateRespType {
    user?: UserDataType,
    success?: boolean,
    valid?: boolean
}

interface LoadingStateType {
    open: boolean,
    text?: string,
}

class USER {
    public static async validate(navigate: NavigateFunction, setUser: SetterOrUpdater<UserDataType>, setLoadingState: SetterOrUpdater<LoadingStateType>, route = '/') {
        try {
            setLoadingState({ open: true, text: '...Setting up everything...' });
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/auth');
                setUser(null)
                return;
            }
            const resp = await fetch(`${BACKEND}/auth/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            })
            const res: ValidateRespType = await resp.json();

            if (res && !res.valid) {
                localStorage.removeItem('token');
                navigate('/');
                setUser(null)
            }

            if (res.user) {
                localStorage.setItem("token", token);
                setUser(res.user);
                navigate(route);
            }
            else {
                navigate('/');
                setUser(null)
                return;
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoadingState({ open: false, text: '' });
        }
    }

    public static async signup(name: string, email: string, passwd: string, setToastState, navigate: NavigateFunction, setLoadingState: SetterOrUpdater<LoadingStateType>) {
        try {
            if (!(name.length) || !(email.length) || !(passwd.length)) {
                setToastState({ title: "Oops!", desc: "Ensure All Fields Are Filled", hasFunc: false });
                return;
            }

            const resp = await fetch(`${BACKEND}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, passwd })
            })
            const res: loginRespType = await resp.json();

            if (res.success) {
                localStorage.setItem('token', res.token);
                setToastState({ title: "Woah!!", desc: "Successfully signed up", hasFunc: false });
                navigate('/products');
            }
            else {
                setToastState({ title: "Oops!", desc: res.msg, hasFunc: false });
            }
        }
        catch (err) {
            console.log("Error occurred\n", err);
            setToastState({ title: "Oops!", desc: "Some error occurred", hasFunc: false });
        }
    }

    public static async login(email: string, passwd: string, setToastState, navigate: NavigateFunction, setLoadingState: SetterOrUpdater<LoadingStateType>) {
        try {
            setLoadingState({ open: true, text: 'Loggin In' });
            if (!(email.length) || !(passwd.length)) {
                setToastState({ title: "Oops!", desc: "Ensure All Fields Are Filled", hasFunc: false });
                return;
            }

            const resp = await fetch(`${BACKEND}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, passwd })
            })
            const res: loginRespType = await resp.json();

            if (res.success) {
                localStorage.setItem('token', res.token);
                setToastState({ title: "Woah!!", desc: "Successfully logged in", hasFunc: false });
                navigate('/products');
            }
            else {
                if (res.valid && !res.valid) localStorage.removeItem('token');
                setToastState({ title: "Oops!", desc: res.msg, hasFunc: false });
            }
        }
        catch (err) {
            console.log("Error occurred\n", err);
            setToastState({ title: "Oops!", desc: "Some error occurred", hasFunc: false });
        }
        finally {
            setLoadingState({ open: false, text: '' });
        }
    }

}



export {
    USER,

}