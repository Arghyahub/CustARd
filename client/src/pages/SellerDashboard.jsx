import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar/Navbar";
import ProductForm from "@/components/ui/addproduct";
import { useEffect, useState } from "react";
import { SELLER } from "@/services/service";
import { useRecoilState } from "recoil";
import { loadingAtom, toastParamAtom, userDataAtom } from "@/recoil/atom";
import { useNavigate } from "react-router-dom";
const BACKEND = import.meta.env.VITE_BACKEND;

export default function SellerDash() {
  const [show, setShow] = useState(false);
  const [user, setUser] = useRecoilState(userDataAtom);
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useRecoilState(loadingAtom);
  const [toastState, setToastState] = useRecoilState(toastParamAtom);

  const handleAddProduct = () => {
    setShow(true);
  };

  const handleDelete = async (productId) => {
    try {
      const resp = await fetch(`${BACKEND}/product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sellerId: user?._id, productId }),
      });
      const res = await resp.json();
      console.log(res);
      if (res.success) {
        setToastState({
          title: "Woah!!",
          desc: "Successfully Deleted!",
          hasFunc: false,
        });
        window.location.reload();
      } else {
        setToastState({ title: "Oops!", desc: res.msg, hasFunc: false });
      }
    } catch (error) {
      console.log("Error while deleting the product!");
      setToastState({ title: "Oopsy, Error!!", desc: "Error while deleting!", hasFunc: false });
    }
  }

  useEffect(() => {
    SELLER.validate(navigate, setUser, setLoadingState, '/sellerDash');
  }, [])


  return (
    <div className="flex-1 w-full">
      <Navbar />
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0">
          <CardTitle>Seller Information</CardTitle>
          {/* <Button className="ml-auto" size="sm" variant="secondary">
            Edit
          </Button> */}
        </CardHeader>
        <CardContent className="grid gap-1 text-sm">
          <div className="font-semibold">Seller Profile!</div>
          <div className="text-gray-500 dark:text-gray-400">
            Seller ID: {user?._id?.slice(0, 5)}
          </div>
          <div>Name: {user?.name}</div>
          <div>
            <p>Email: {user?.email}</p>
            <p>This is the seller dashboard. You can see your products and add/delete products. More features coming soon!</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Products</CardTitle>
          <div>
            <Button className="my-3" onClick={handleAddProduct}>
              Add New Product +
            </Button>
          </div>

          {show ? (
            <div className="absolute top-0 w-[700px]">
              <ProductForm />
            </div>
          ) : (
            <></>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {user && user.products?.length > 0 ? (
              user.products.map((product, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 py-4">
                      {product.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">
                        {"₹" + product.price}
                      </span>
                      <Button size="sm" onClick={() => handleDelete(product._id)}>Delete</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-md text-gray-500 dark:text-gray-400 py-4">
                No products to show!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
