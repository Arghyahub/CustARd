import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { USER } from "@/services/service";
import { loadingAtom, userDataAtom } from "@/recoil/atom";
import Navbar from "@/components/navbar/Navbar";
import { PropagateLoader } from "react-spinners";
import Footer from "../components/footer/footer"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import HeroImage from "@/assets/HeroImg.png"
import Soap from "@/assets/Soaps.jpg"
import Profile from "@/assets/profilepic.jpg"
import SimpleNavbar from "@/components/navbar/SimpleNavbar";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userDataAtom);
  const [LoadingState, setLoadingState] = useRecoilState(loadingAtom);

  useEffect(() => {
    console.log("User deatis: ", user);
  }, [user])

  return (
    <div className="flex flex-col w-full">
      {user && user.email !== "" ? <Navbar /> : <SimpleNavbar />}
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-16 xl:py-32 px-4 space-y-4 md:px-12">
          <div className="grid lg:grid-cols-2 px-4 md:pl-3 items-center">
            <div className="space-y-4 lg:px-24">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 text-secdark">
                New Products
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Discover the latest products. ✨
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Shop the best deals on skin care products, and accessories.
              </p>
            </div>
            <div><img
              alt="Image"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center w-full h-full"
              src={HeroImage}
            /></div>
          </div>
        </section>
        <section className="w-full py-12 md:py-16 lg:py-16 xl:py-48 bg-seclight">
          <div className="container flex flex-col items-center justify-center px-4 space-y-4 md:px-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">View. Experience. Buy.</h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                The latest products at your fingertips. Fast shipping. Top brands. Amazing prices.
              </p>
            </div>
            <form className="flex flex-col gap-2 min-[400px]:flex-row sm:gap-4 lg:gap-2">
              <Input className="max-w-sm" placeholder="Enter your email" type="email" />
              <Button type="submit">Sign Up for Newsletter</Button>
            </form>
          </div>
        </section>
        <section className="w-full py-12 md:py-16 lg:py-16 xl:py-32 px-4 space-y-4 md:px-12">
          <div className="grid lg:grid-cols-2 px-4 md:pl-3 items-center">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 my-3">
              <Card>
                <img
                  alt="Thumbnail"
                  className="aspect-post overflow-hidden object-cover object-center"
                  height="200"
                  src={Soap}
                  width="300"
                />
                <CardContent className="p-4">
                  <h3 className="font-bold">Vaseline</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Description of the product. This is a really cool item you should buy.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">$199</span>
                    <Button size="sm" onClick={() => navigate("/products")}>Buy Now</Button>
                  </div>
                </CardContent>
              </Card><Card>
                <img
                  alt="Thumbnail"
                  className="aspect-post overflow-hidden object-cover object-center"
                  height="200"
                  src={Soap}
                  width="300"
                />
                <CardContent className="p-4">
                  <h3 className="font-bold">Vaseline</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Description of the product. This is a really cool item you should buy.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">$199</span>
                    <Button size="sm" onClick={() => navigate("/products")}>Buy Now</Button>
                  </div>
                </CardContent>
              </Card><Card>
                <img
                  alt="Thumbnail"
                  className="aspect-post overflow-hidden object-cover object-center"
                  height="200"
                  src={Soap}
                  width="300"
                />
                <CardContent className="p-4">
                  <h3 className="font-bold">Vaseline</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Description of the product. This is a really cool item you should buy.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">$199</span>
                    <Button size="sm" onClick={() => navigate("/products")}>Buy Now</Button>
                  </div>
                </CardContent>
              </Card></div>
            <div className="space-y-4 lg:px-24">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 text-secdark">
                Top Products
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Hot Deals ❤️‍🔥</h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Limited time offers. Grab them before they're gone.
              </p>
              <Button size="lg" onClick={() => navigate("/products")}>Check out the products now!</Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 text-secdark">Testimonials</div>
              <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                What our customers are saying
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                "The customer service was fantastic. My order arrived quickly and the product was exactly as described.
                I'll definitely be shopping here again!"
              </p>
            </div>
            <div className="grid max-w-4xl items-start gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-1 lg:items-center">
              <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                <img
                  alt="Avatar"
                  className="aspect-square rounded-full object-cover object-center"
                  height="100"
                  src={Profile}
                  width="100"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secdark text-white">
          <div className="container grid items-center justify-center gap-4 px-4 md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-center py-3">
                Get ready for the ultimate glow-up! ✨
              </h2>
              <p className="mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-center">
                Your skin's next love affair is just a click away with our curated collection of 10+ amazing skincare products. We're here to pamper you more than your bf ;)
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                <Button className="bg-seclight text-secdark hover:text-seclight" type="submit">Sign Up to Newsletter</Button>
              </form>
              <p className="text-xs ">
                Sign up to received updates and notifications on your email.{" "}
                <Link className="underline underline-offset-2" to="#">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home