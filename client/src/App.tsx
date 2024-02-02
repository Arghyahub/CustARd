import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

import "./App.css"
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Demo from "./pages/Demo";
import { screenWidthAtom, toastParamAtom } from "./recoil/atom";
import Home from "./pages/Home";
import { Loading } from "./components/reusables";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/auth/:param?",
    element: <Auth />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/demo",
    element: <Demo />
  },
  {
    path: "*",
    element: <div>I'll fix that</div>
  }
]);

const App = () => {
  const { toast } = useToast()
  // Calculating screen width
  const [ScreenWidth, setScreenWidth] = useRecoilState(screenWidthAtom);
  const [ToastState, setToastState] = useRecoilState(toastParamAtom);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // complete

  // Toast config
  useEffect(()=>{
    if (ToastState.desc.length===0) return;
    const copyToast = {...ToastState} ;
    if (copyToast.hasFunc){
      toast({ title: copyToast.title, description: copyToast.desc, action: <ToastAction onClick={copyToast.func} altText="Try again">Try again</ToastAction>, duration: 6000 })
    }
    else{
      toast({ title: copyToast.title, description: copyToast.desc, duration: 3000})
    }
    setToastState({title: '',desc:'',hasFunc: false, func: ()=>{}}) ;
  },[ToastState])



  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
      <Loading />
    </>
  )
}

export default App;
