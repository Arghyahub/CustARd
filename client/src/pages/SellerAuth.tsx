import React, { useEffect, useState } from "react";
import { loadingAtom, screenWidthAtom, toastParamAtom, userDataAtom } from "@/recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    AuthVec,
    EmailSVG,
    CheckSVG,
    LockSVG,
    EditSVG
} from "@/assets/index";
import {
    Input
} from "@/components/reusables/index";
import { USER } from "@/services/service";
const BACKEND = import.meta.env.VITE_BACKEND;

interface inputParam {
    target: {
        name: HTMLInputElement,
        email: HTMLInputElement,
        passwd: HTMLInputElement
    }
}
interface loginRespType {
    success: boolean,
    msg: string,
    token?: string,
    err?: string,
    valid?: boolean
}

const SellerAuth = () => {
    const navigate = useNavigate();
    const { param } = useParams();
    const [IsNewUser, setIsNewUser] = useState(false);
    const [ToastState, setToastState] = useRecoilState(toastParamAtom);
    const screenWidth = useRecoilValue(screenWidthAtom);
    const [LoadingState, setLoadingState] = useRecoilState(loadingAtom);
    const [user, setUser] = useRecoilState(userDataAtom);

    useEffect(() => {
        // USER.validate(navigate, setUser, setLoadingState, '/');
    }, [])

    useEffect(() => {
        if (!param || param.length === 0) return;
        if (param === 'login') setIsNewUser(false);
        if (param === 'signup') setIsNewUser(true);
    }, [param])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> & inputParam) => {
        e.preventDefault();
        const name = e.target.name.value, email = e.target.email.value, passwd = e.target.passwd.value;

        if (IsNewUser) {
            try {
                if (!(name.length) || !(email.length) || !(passwd.length)) {
                    setToastState({ title: "Oops!", desc: "Ensure All Fields Are Filled", hasFunc: false });
                    return;
                }

                const resp = await fetch(`${BACKEND}/seller/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, passwd })
                })
                const res: loginRespType = await resp.json();

                if (res.success) {
                    localStorage.setItem('token', res.token);
                    setToastState({ title: "Woah!!", desc: "Successfully signed up as seller", hasFunc: false });
                    navigate('/sellerDash');
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
        else {
            const email = e.target.email.value, passwd = e.target.passwd.value;

            try {
                setLoadingState({ open: true, text: 'Logging In' });
                if (!(email.length) || !(passwd.length)) {
                    setToastState({ title: "Oops!", desc: "Ensure All Fields Are Filled", hasFunc: false });
                    return;
                }
    
                const resp = await fetch(`${BACKEND}/seller/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, passwd })
                })
                const res: loginRespType = await resp.json();
    
                if (res.success) {
                    localStorage.setItem('token', res.token);
                    setToastState({ title: "Woah!!", desc: "Successfully logged into your seller profile!", hasFunc: false });
                    navigate('/sellerDash');
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

    return (
        <div className="h-screen w-screen flex flex-col">
            <div className="w-11/12 h-full bg-white rounded-xl flex flex-row">
                <div className={`right-img h-full w-3/5 flex flex-row justify-center items-center bg-black text-white text-5xl font-bold ${screenWidth < 700 ? 'hidden' : ''}`}>
                    CustARd.
                </div>

                <div className={`left-form lg:px-6 flex flex-col h-full justify-center items-center p-4 rounded-xl gap-4 ${screenWidth < 700 ? 'w-full' : 'w-2/5'}`}>
                    {(screenWidth < 700) && (
                        <img src={AuthVec} alt="Vector Image" className="h-40 w-40 object-contain p-2 -mb-7" />
                    )}
                    <h3 className={`w-full font-semibold ${screenWidth < 700 ? 'text-center' : ''}`}>{IsNewUser ? "Welcome, create your seller profile!" : "Welcome Back Seller!"}</h3>
                    <p className={`w-full ${screenWidth < 700 ? 'text-center' : ''}`}>{IsNewUser ? "Start selling products in a brand new way with CustARd" : "Login back to your account, we are waiting for you!"}</p>

                    {IsNewUser ?
                        <form onSubmit={handleSubmit} className="b-2 w-full m-4 flex flex-col gap-4 py-2">
                            <Input StartIcon={EmailSVG} EndIcon={CheckSVG} name="email" label="Email Address" inputType="email" />
                            <Input StartIcon={EditSVG} EndIcon={CheckSVG} name="name" label="Name" />
                            <Input StartIcon={LockSVG} EndIcon={CheckSVG} name="passwd" label="Password" inputType="password" />
                            <div className="flex flex-row w-full justify-center gap-9 lg:mt-4 md:mt-2 sm:mt-1">
                                <button type="submit" className="px-4 py-2 bg-blue-500 rounded-lg text-white border-2">
                                    Seller Signup
                                </button>
                                <button type="button" className="px-4 py-2 border-2 rounded-lg text-gray-400 hover:bg-blue-500 hover:text-white" onClick={(e) => { e.preventDefault(); setIsNewUser(false) }}>
                                    Seller Login
                                </button>
                            </div>
                        </form>
                        :
                        <form onSubmit={handleSubmit} className="b-2 w-full m-4 flex flex-col gap-4 py-2">
                            <Input StartIcon={EmailSVG} EndIcon={CheckSVG} name="email" label="Email Address" inputType="email" />
                            <Input StartIcon={LockSVG} EndIcon={CheckSVG} name="passwd" label="Password" inputType="password" />
                            <div className="flex flex-row w-full justify-center gap-9 lg:mt-4 md:mt-2 sm:mt-1">
                                <button type="button" className="px-4 py-2 rounded-lg text-gray-400 hover:bg-blue-500 hover:text-white" onClick={(e) => { e.preventDefault(); setIsNewUser(true) }}>
                                    Seller Signup
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 rounded-lg text-white">
                                    Seller Login
                                </button>
                            </div>
                        </form>
                    }
                    <Link to="/auth">Looking to login as normal user?</Link>
                </div>
            </div>
        </div>
    );
};

export default SellerAuth;
