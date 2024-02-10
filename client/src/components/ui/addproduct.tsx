/** @format */

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
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
    keywords: [],
  });
  const [toastState, setToastState] = useRecoilState(toastParamAtom);

  const handleSubmit = async () => {
    console.log(product);
    const { name, desc, price, arLink, keywords, image } = product;
    if (!name || !price || !desc) {
      alert("Name, Desc and Price are required!");
      return;
    }
    try {
      const resp = await fetch(`${BACKEND}/product/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, desc, price, arLink, keywords, image, token }),
      });
      const res = await resp.json();
      if (res.success) {
        localStorage.setItem("token", res.token);
        setToastState({
          title: "Woah!!",
          desc: "Successfully created!",
          hasFunc: false,
        });
        handleCancel();
      } else {
        setToastState({ title: "Oops!", desc: res.msg, hasFunc: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setProduct((prev) => ({ ...prev, [name]: value }));
    if (name === 'keywords') {
      setProduct((prev) => ({ ...prev, [name]: value.split(',') }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files[0];

    if (imgFile) {
      try {
        const base64 = await convertBase64(imgFile)
        const resp: any = await fetch(`${BACKEND}/product/image`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64, token })
        })
        const res = await resp.json();
        setProduct((prev) => ({ ...prev, image: res.imageUrl }))
        setToastState({
          title: "Woah!!",
          desc: "Image uploaded!",
          hasFunc: false,
        });
      } catch (error) {
        console.error("Error converting image to base64:", error);
        setToastState({ title: "Oops!", desc: "Error in uploading image!", hasFunc: false });
      }
    }
  };


  const handleCancel = () => {
    window.location.reload();
  };
  return (
    <div className="absolute w-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add Product</CardTitle>
          <CardDescription>
            Fill in the details below to add a new product.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name">Product Name</label>
            <Input
              id="name"
              name="name"
              placeholder="Enter product name"
              value={product.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="images">Product Image</label>
            <Input id="images" name="image" type="file" accept="image/*" onChange={handleImg} />
          </div>
          <div className="space-y-2">
            <label htmlFor="description">Description</label>
            <Input
              className=""
              name="desc"
              id="description"
              placeholder="Enter product description"
              value={product.desc}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="price">Price</label>
            <Input
              id="price"
              name="price"
              placeholder="Enter price"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description">AR Link</label>
            <p className="text-gray-500 font-bold px-2">
              Follow these instructions to create an AR link:
            </p>
            <p className="text-gray-500 text-sm px-2">
              1. Install `Reality Scan` and scan your product to create a 3D
              model. <a className="text-indigo-700 underline" target="_blank" href="https://youtu.be/HVkvHZCmVjU?si=cgMn9j29pVnzqMg9">Get Help</a>
            </p>
            <p className="text-gray-500 text-sm px-2">
              2. Upload the 3D model on the{" "}
              <a className="text-indigo-700 underline" target="_blank" href="https://sketchfab.com/">`Sketchfab`</a>.
            </p>
            <Input
              className=""
              name="arLink"
              id="description"
              placeholder="Enter product AR link"
              value={product.arLink}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="keywords">Product Keywords (comma-separated)</label>
            <Input
              id="keywords"
              name="keywords"
              placeholder="Enter product keywords"
              value={product.keywords.join(",")}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter className="space-x-4">
          <Button onClick={handleSubmit}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
