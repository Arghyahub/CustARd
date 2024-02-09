import React, { useEffect, useState } from "react";
import { loadingAtom, screenWidthAtom, toastParamAtom, userDataAtom } from "@/recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";

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

interface inputParam {
  target: {
    name: HTMLInputElement,
    email: HTMLInputElement,
    passwd: HTMLInputElement
  }
}

const Auth = () => {
  const navigate = useNavigate();
  const { param } = useParams();
  const [IsNewUser, setIsNewUser] = useState(false);
  const [ToastState, setToastState] = useRecoilState(toastParamAtom);
  const screenWidth = useRecoilValue(screenWidthAtom);
  const [LoadingState, setLoadingState] = useRecoilState(loadingAtom);
  const [user, setUser] = useRecoilState(userDataAtom);

  useEffect(() => {
    USER.validate(navigate, setUser, setLoadingState, '/');
  }, [])

  useEffect(() => {
    if (!param || param.length === 0) return;
    if (param === 'login') setIsNewUser(false);
    if (param === 'signup') setIsNewUser(true);
  }, [param])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> & inputParam) => {
    e.preventDefault();
    if (IsNewUser) {
      USER.signup(e.target.name.value, e.target.email.value, e.target.passwd.value, setToastState, navigate, setLoadingState);
    }
    else {
      USER.login(e.target.email.value, e.target.passwd.value, setToastState, navigate, setLoadingState)
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
          <h3 className={`w-full font-semibold ${screenWidth < 700 ? 'text-center' : ''}`}>{IsNewUser ? "Welcome User" : "Welcome Back!"}</h3>
          <p className={`w-full ${screenWidth < 700 ? 'text-center' : ''}`}>{IsNewUser ? "Create your account and start exploring products in a brand new way" : "Login back to your account, we are waiting for you!"}</p>

          {IsNewUser ?
            <form onSubmit={handleSubmit} className="b-2 w-full m-4 flex flex-col gap-4 py-2">
              <Input StartIcon={EmailSVG} EndIcon={CheckSVG} name="email" label="Email Address" inputType="email" />
              <Input StartIcon={EditSVG} EndIcon={CheckSVG} name="name" label="Name" />
              <Input StartIcon={LockSVG} EndIcon={CheckSVG} name="passwd" label="Password" inputType="password" />
              <div className="flex flex-row w-full justify-center gap-9 lg:mt-4 md:mt-2 sm:mt-1">
                <button type="submit" className="px-4 py-2 bg-blue-500 rounded-lg text-white border-2">
                  Signup
                </button>
                <button type="button" className="px-4 py-2 border-2 rounded-lg text-gray-400 hover:bg-blue-500 hover:text-white" onClick={(e) => { e.preventDefault(); setIsNewUser(false) }}>
                  Login
                </button>
              </div>
            </form>
            :
            <form onSubmit={handleSubmit} className="b-2 w-full m-4 flex flex-col gap-4 py-2">
              <Input StartIcon={EmailSVG} EndIcon={CheckSVG} name="email" label="Email Address" inputType="email" />
              <Input StartIcon={LockSVG} EndIcon={CheckSVG} name="passwd" label="Password" inputType="password" />
              <div className="flex flex-row w-full justify-center gap-9 lg:mt-4 md:mt-2 sm:mt-1">
                <button type="button" className="px-4 py-2 rounded-lg text-gray-400 hover:bg-blue-500 hover:text-white" onClick={(e) => { e.preventDefault(); setIsNewUser(true) }}>
                  Signup
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 rounded-lg text-white">
                  Login
                </button>
              </div>
            </form>
          }
        </div>


      </div>
    </div>
  );
};

export default Auth;
