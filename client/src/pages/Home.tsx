import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { USER } from "@/services/service";
import { loadingAtom, userDataAtom } from "@/recoil/atom";
import Navbar from "@/components/navbar/Navbar";
import {PropagateLoader} from "react-spinners";

const Home = () => {
  const navigate = useNavigate();
  const [User, setUser] = useRecoilState(userDataAtom) ;
  const [LoadingState, setLoadingState] = useRecoilState(loadingAtom) ;

  useEffect(() => {
    // USER.validate(navigate,setUser,setLoadingState,'/home') ;  // Isko uncomment karna hai
    
    navigate("/demo")   // Testing purpose k liye demo page
  },[])
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full min-h-[92vh] bg-[var(--background)]">
        <h1 className="text-white text-center">Your main content will be here</h1>
        <p className="text-white">Phor k ana</p>
      </div>
    </div>
  )
}

export default Home