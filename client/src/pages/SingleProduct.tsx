/** @format */

import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import Demo from "../pages/Demo";
import { useEffect, useState } from "react";
import placeholder from "../assets/placeholder.jpeg";
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

  const [addtoCart, setAddToCart] = useState(false);
  const handleCart = () => {
    setAddToCart(!addtoCart);
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
    <div className="bg-gray-100 dark:bg-gray-900 w-full">
      {detail && (
        <div className="py-8 lg:py-12 w-full">
          <Link to="/products" className="text-[#429baf] hover:text-[#42a7be] underline px-10"> &lt;- Back</Link>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-7xl px-4 mx-auto w-full my-4 border">
            <div className="flex flex-col gap-4 lg:gap-8 items-start w-full py-10 px-10">
              <h1 className="font-bold text-3xl sm:text-5xl tracking-tighter">
                {detail.name}
              </h1>
              <div className="flex items-center gap-4">
                <h4 className="font-semibold text-base md:text-lg">{"₹" + detail.price}</h4>
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
              </div>
              <div className="grid gap-4 text-base lg:text-xl leading-loose">
                <p>{detail.desc}</p>
              </div>
              {/* <div className="text-4xl font-bold">{detail.price}</div> */}
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {detail.arLink !== "" && <Button size="lg" onClick={handleShow}>
                  {!showAr ? <span>Show AR</span> : <span>Show Image</span>}
                </Button>}
                <Button size="lg" onClick={handleCart} disabled={addtoCart ? true : false}>
                  Add to cart
                </Button>
                {addtoCart ? (
                  <div className="absolute flex md:w-[500px] top-1/2 left-1/2 bg-seclight border shadow-xl p-4 lg:p-20 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex-1 justify-center items-center text-center">
                      <p className="text-xl font-medium pb-2">
                        🎊 Add to Cart under process! 🎊
                      </p>
                      <p className="text-lg font-regular">
                        More Features coming soon.
                      </p>
                      <p className="text-lg font-regular">Stay tuned...🤠</p>
                      <Button size="lg" className="my-4" onClick={handleCart}>
                        Close
                      </Button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="grid w-full h-full py-12 max-h-[500px]">
              {showAr ? (
                <Demo arLink={detail.arLink} />
              ) : (
                <img src={detail?.image || placeholder} className="w-full h-full object-cover" alt="product img" />
              )}
            </div>
          </div>
        </div>
      )}
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
