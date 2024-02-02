import { NavigateFunction } from "react-router-dom";

const BACKEND = import.meta.env.VITE_BACKEND ;
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
    public static async validate(navigate:NavigateFunction, setUser:SetterOrUpdater<UserDataType>,setLoadingState:SetterOrUpdater<LoadingStateType>, route='/') {
        try {
            setLoadingState({open: true, text: '...Setting up everything...'}) ;
            const token = localStorage.getItem('token') ;
            if (!token){
                if (route==='/') return;
                else navigate('/');
            }
            const resp = await fetch(`${BACKEND}/auth/validate`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token: token}) 
            })
            const res:ValidateRespType = await resp.json() ;

            if (res.valid && !res.valid){
                localStorage.removeItem('token') ;
                navigate('/') ;
                return;
            }

            if (res.user){
                setUser(res.user) ;
                navigate('/home') ;
            }
            else{
                if (route==='/') return;
                else navigate('/');
            }
        } catch (error) {
            console.log(error) ;
        }
        finally{
            setLoadingState({open: false, text: ''}) ;
        }
    }

    public static async signup(name:string, email:string, passwd: string, setToastState, navigate:NavigateFunction, setLoadingState:SetterOrUpdater<LoadingStateType> ){
        try {
            if (!(name.length) || !(email.length) || !(passwd.length)){
                setToastState({title: "Oops!", desc: "Ensure All Fields Are Filled", hasFunc: false}) ;
                return;
            }
    
            const resp = await fetch(`${BACKEND}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name,email,passwd})
            })
            const res:loginRespType = await resp.json() ;

            if (res.success){
                localStorage.setItem('token',res.token);
                setToastState({title: "Woah!!", desc: "Successfully signed up", hasFunc: false}) ;
                navigate('/home') ;
            }
            else{
                setToastState({title: "Oops!", desc: res.msg, hasFunc: false}) ;
            }
        }
        catch(err) {
            console.log("Error occurred\n",err) ;
            setToastState({title: "Oops!", desc: "Some error occurred", hasFunc: false}) ;
        }
    }
    
    public static async login(email:string, passwd: string, setToastState, navigate:NavigateFunction, setLoadingState:SetterOrUpdater<LoadingStateType> ){
        try {
            setLoadingState({open: true, text: 'Loggin In'}) ;
            if (!(email.length) || !(passwd.length)){
                setToastState({title: "Oops!", desc: "Ensure All Fields Are Filled", hasFunc: false}) ;
                return;
            }
    
            const resp = await fetch(`${BACKEND}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email,passwd})
            })
            const res:loginRespType = await resp.json() ;

            if (res.success){
                localStorage.setItem('token',res.token);
                setToastState({title: "Woah!!", desc: "Successfully logged in", hasFunc: false}) ;
                navigate('/home') ;
            }
            else{
                if (res.valid && !res.valid) localStorage.removeItem('token') ;
                setToastState({title: "Oops!", desc: res.msg, hasFunc: false}) ;
            }
        }
        catch(err) {
            console.log("Error occurred\n",err) ;
            setToastState({title: "Oops!", desc: "Some error occurred", hasFunc: false}) ;
        }
        finally{
            setLoadingState({open: false, text: ''}) ;
        }
    }

}



export {
    USER,

}