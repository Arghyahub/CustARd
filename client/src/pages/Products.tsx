import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import placeholder from "../assets/placeholder.jpeg";
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Navbar from "@/components/navbar/Navbar"
import { useEffect, useRef, useState } from "react"
import nlp from 'compromise';
import {
  MessageCircleMore,
  Send
} from 'lucide-react';
import { useRecoilState } from "recoil";
import { loadingAtom } from "@/recoil/atom";

const BACKEND = import.meta.env.VITE_BACKEND;

interface loginRespType {
  success: boolean,
  msg: string,
  token?: string,
  err?: string,
  valid?: boolean,
  products?: [],
}

interface ChatFormE {
  target: {
    chad: HTMLInputElement
  }
}

type prod = {
  name: string,
  _id: string
}
interface ChatMsg {
  msg: string,
  user: string
  prod?: prod[]
}

export default function Products() {
  const [products, setProduct] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [chats, setChats] = useState<ChatMsg[]>([{ msg: 'How can I help you', user: 'bot' }])
  const chatContainer = useRef(null);
  const [LoadingState, setLoadingState] = useRecoilState(loadingAtom);
  const navigate = useNavigate();

  function calculateMatchCount(keywords, product) {
    return product.keywords.filter(keyword => keywords.includes(keyword)).length;
  }

  const toggleChat = () => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
    setShowChat(prev => !prev);
  }

  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, [showChat, chats])

  const fetchProducts = async () => {
    console.log(":: Fetching products");
    setLoadingState({ open: true, text: 'Fetching products...' });
    try {
      const resp = await fetch(`${BACKEND}/product`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const res: loginRespType = await resp.json();
      console.log(res?.products);
      setProduct(res?.products)
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoadingState({ open: false, text: '' });
      console.log(":: Done fetching products");
    }
  }

  const handleChatForm = async (e: React.FormEvent<HTMLFormElement> & ChatFormE) => {
    e.preventDefault();
    const currchat = e.target.chad.value;
    e.target.chad.value = '';

    if (!currchat || !currchat.length) {
      alert("No text?")
      return;
    }
    setChats(prev => [...prev, { msg: currchat, user: 'cust' }])

    const doc = nlp(currchat);
    const verbs = doc.verbs().toInfinitive().unique().out('array');
    const nouns1 = doc.nouns().toSingular().unique().toLowerCase().out('array');

    const nouns = nouns1.concat(verbs);
    const arr = []
    nouns.forEach((noun) => {
      const p = noun.split(' ');
      arr.push(...p);
    })

    console.log(arr);

    try {
      const resp = await fetch(`${BACKEND}/product/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ keywords: arr })
      })
      const res = await resp.json();

      if (!res.products || !res.products.length) {
        setChats(prev => [...prev, { msg: 'No product found', user: 'bot' }])
      } else {
        const products = res.products;
        products.sort((a, b) => calculateMatchCount(arr, b) - calculateMatchCount(arr, a));
        console.log(products);
        setChats(prev => [...prev, { msg: 'Here are some products', user: 'bot', prod: products }])
      }

    } catch (error) {
      console.log(":: Error in fetching products list /list / (product.ts)", error);
    }
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
                  <h4 className="font-semibold text-base md:text-lg">{"₹" + product.price}</h4>
                </div>
                <p className="text-sm text-gray-500 py-4 overflow-hidden whitespace-nowrap overflow-ellipsis">{product.desc}</p>
                <Button className="w-full" size="icon" onClick={() => navigate(`/product/${product._id}`)}>
                  Show More
                </Button>
              </div>
            </div>
          ))}

          {!showChat ? (
            <div className="group shadow-2xl">
              <button onClick={toggleChat} className="flex flex-row shadow-2xl justify-center items-center fixed bottom-20 right-24 h-20 z-50 w-20 rounded-full bg-secdark peer group-hover:h-24 group-hover:w-24 group-hover:bottom-[4.5rem] group-hover:right-[5.5rem]" >
                <MessageCircleMore className="h-12 w-12 group-hover:h-14 group-hover:w-14 text-white peer-hover:h-14 peer-hover:w-14" />
              </button>
            </div>
          ) : (
            <>
              <div className=" flex flex-col fixed z-50 rounded-md bottom-9 right-10 w-56 md:w-72 h-96 lg:h-[450px] lg:w-80 md:h-[400px] md:bottom-20 md:right-24 border border-slate-200 shadow-xl">
                <div className="chathead flex flex-row px-3 py-2 border border-b-slate-200 rounded-t-md bg-white">
                  <p className="mr-auto font-bold text-md text-secdark">Hello Customer</p>
                  <button onClick={toggleChat} className="text-black font-bold text-md">X</button>
                </div>
                <div ref={chatContainer} className="flex bg-white flex-col w-full h-full p-2 overflow-y-auto ">
                  {chats.map((chat, i) => (
                    <div key={i} className={`flex flex-col p-2 mb-2 text-white rounded-b-md ${chat.user === 'bot' ? 'mr-auto bg-blue-500 rounded-tr-md' : 'ml-auto bg-secdark rounded-tl-md'}`}>
                      <p>{chat.msg}</p>
                      {chat?.prod && chat.prod.map((prod, i) => {
                        if (i < 3) return (
                          <Link to={`/product/${prod._id}`} key={`prod${i}`} className="underline text-green-100">{prod.name}</Link>
                        )
                      }
                      )}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleChatForm} className="flex flex-row items-center w-full p-1 bg-slate-100 gap-1 rounded-b-md px-3">
                  <input placeholder="Searching for a product?" name="chad" type="text" className="w-full p-2 outline-none bg-slate-100" />
                  <button type="submit">
                    <Send className="text-blue-600" />
                  </button>
                </form>
              </div>
            </>
          )}

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

