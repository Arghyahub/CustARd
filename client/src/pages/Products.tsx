import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Cream from "../assets/product.jpg"
import placeholder from "../assets/placeholder.jpeg";
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Navbar from "@/components/navbar/Navbar"
import { useEffect, useState } from "react"
const BACKEND = import.meta.env.VITE_BACKEND;

interface loginRespType {
  success: boolean,
  msg: string,
  token?: string,
  err?: string,
  valid?: boolean,
  products?: [],
}

export default function Products() {
  const [products, setProduct] = useState([]);

  const fetchProducts = async () => {
    const resp = await fetch(`${BACKEND}/product`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const res: loginRespType = await resp.json();
    console.log(res?.products);
    setProduct(res?.products)
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <>
      <Navbar />
      <div className="relative m-4 md:m-6">
        <SearchIcon className="absolute left-3.5 top-2.5 h-4 w-4 text-gray-500 " />
        <Input
          className="w-full bg-white shadow-none appearance-none pl-8"
          placeholder="Search products..."
          type="search"
        />
      </div>
      {products.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-start gap-4 md:gap-6 p-4 md:p-6">
          {products.map((product, i) => (
            <div className="flex flex-col rounded-lg overflow-hidden border-2 shadow-lg" key={i}>
              <Link className="flex-1" to="#">
                <span className="sr-only">View</span>
              </Link>
              <img
                alt="Product 1"
                className="aspect-video w-full object-cover"
                height={300}
                src={product.image || placeholder}
                width={400}
              />
              <div className="flex-1 p-4 gap-4 items-start">
                <div className="flex items-center justify-between py-4">
                  <h3 className="font-semibold text-base md:text-lg">{product.name}</h3>
                  <h4 className="font-semibold text-base md:text-lg">{product.price}</h4>
                </div>
                <p className="text-sm text-gray-500 py-4">{product.desc}</p>
                <Button className="w-full" size="icon">
                  <Link to={`/product/${product._id}`}>Show More</Link>
                </Button>
              </div>
            </div>
          ))}
        </section>
      )
        : (
          <div className="flex justify-center h-[400px] items-center text-gray-500">
            No products listed!
          </div>
        )}
    </>
  )
}

