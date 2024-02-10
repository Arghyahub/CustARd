import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChangeEvent, useState } from "react"
import { toastParamAtom } from "@/recoil/atom";
import { useRecoilState } from "recoil";
const BACKEND = import.meta.env.VITE_BACKEND;
const token = localStorage.getItem("token");

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    desc: "",
    image: "",
    price: "",
    arLink: "",
    keywords: []
  });
  const [toastState, setToastState] = useRecoilState(toastParamAtom);

  const handleSubmit = async () => {
    console.log(product)
    const { name, desc, price, arLink, keywords } = product;
    if (!name || !price || !desc) {
      alert("Name, Desc and Price are required!")
      return;
    }
    try {
      const resp = await fetch(`${BACKEND}/product/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, desc, price, arLink, keywords, token })
      })
      const res = await resp.json();
      if (res.success) {
        localStorage.setItem('token', res.token);
        setToastState({ title: "Woah!!", desc: "Successfully created!", hasFunc: false });
        handleCancel();
      }
      else {
        setToastState({ title: "Oops!", desc: res.msg, hasFunc: false });
      }
    } catch (error) {
      console.log(error) ;
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    window.location.reload();
  }
  return (
    <div className="absolute w-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add Product</CardTitle>
          <CardDescription>Fill in the details below to add a new product.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name">Product Name</label>
            <Input id="name" name="name" placeholder="Enter product name" value={product.name} onChange={handleChange} />
          </div>
          <div className="space-y-4">
            <label htmlFor="images">Product Image</label>
            <Input id="images" name="image" type="file" />
          </div>
          <div className="space-y-2">
            <label htmlFor="description">Description</label>
            <Input className="" name="desc" id="description" placeholder="Enter product description" value={product.desc} onChange={handleChange} />
          </div>
          <div className="space-y-4">
            <label htmlFor="price">Price</label>
            <Input id="price" name="price" placeholder="Enter price" value={product.price} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <label htmlFor="description">AR Link</label>
            <Input className="" name="arLink" id="description" placeholder="Enter product AR link" value={product.arLink} onChange={handleChange} />
          </div>
        </CardContent>
        <CardFooter className="space-x-4">
          <Button onClick={handleSubmit}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
