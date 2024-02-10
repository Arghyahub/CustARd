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
import Auth from "./pages/Auth";
import Demo from "./pages/Demo";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import SellerDash from "./pages/SellerDashboard";
import SellerAuth from "./pages/SellerAuth";
import { screenWidthAtom, toastParamAtom } from "./recoil/atom";
import Home from "./pages/Home";
import { Loading } from "./components/reusables";
import Test from "./test/Test";
const BACKEND = import.meta.env.VITE_BACKEND;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/auth/:param?",
    element: <Auth />
  },
  {
    path: "/seller/:param?",
    element: <SellerAuth />
  },
  {
    path: "/demo",
    element: <Demo />
  },
  {
    path: "/test",
    element: <Test />
  },
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/product/:id",
    element: <SingleProduct />
  },
  {
    path: "/sellerdash",
    element: <SellerDash />
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
    fetch(BACKEND,{method: 'GET', headers: { 'Content-Type': 'application/json'}})    // Just to fasten cold start
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // complete

  // Toast config
  useEffect(() => {
    if (ToastState.desc.length === 0) return;
    const copyToast = { ...ToastState };
    if (copyToast.hasFunc) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast({ title: copyToast.title, description: copyToast.desc, action: <ToastAction onClick={copyToast.func} altText="Try again">Try again</ToastAction>, duration: 6000 })
    }
    else {
      toast({ title: copyToast.title, description: copyToast.desc, duration: 3000 })
    }
    setToastState({ title: '', desc: '', hasFunc: false, func: () => { } });
  }, [ToastState])



  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
      <Loading />
    </>
  )
}

export default App;
