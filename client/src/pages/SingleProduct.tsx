/** @format */

import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import Demo from "../pages/Demo";
import { useEffect, useState } from "react";
const BACKEND = import.meta.env.VITE_BACKEND;

interface productParams {
  name: string;
  desc: string;
  price: string;
  createdAt: Date;
  arLink: string;
  image: string;
}

export default function Component() {
  const [detail, setDetail] = useState<productParams>();
  const { id } = useParams();

  const [showAr, setShowAr] = useState(false);
  const handleShow = () => {
    setShowAr(!showAr);
  };

  const fetchDetails = async () => {
    const resp = await fetch(`${BACKEND}/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await resp.json();
    console.log(res?.product);
    setDetail(res?.product);
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 w-full">
      <div className="flex py-12 lg:py-16 w-full">
        {showAr ? <Demo arLink={"https://sketchfab.com/models/98a50c126fb04e32af738c13e8493689/embed"}/> : <></>}
        <div className="grid gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto w-full">
          {/* {detail && ( */} 
            <div className="flex flex-col gap-4 lg:gap-8 items-start border w-full py-10 px-10">
              <h1 className="font-bold text-3xl sm:text-5xl tracking-tighter">
                {/* {detail.name} */} Vaseline
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
              </div>
              <div className="grid gap-4 text-base lg:text-xl leading-loose">
                {/* <p>{detail.desc}</p> */} This is Vaseline
              </div>
              {/* <div className="text-4xl font-bold">{detail.price}</div> */}
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" onClick={handleShow}>
                  {!showAr ? <span>Show AR</span> : <span>Hide</span>}
                </Button>
                <Button size="lg">Add to cart</Button>
              </div>
            </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
