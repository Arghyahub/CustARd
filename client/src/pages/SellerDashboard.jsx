/**
 * v0 by Vercel.
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 *
 * @format
 * @see https://v0.dev/t/M4pig9GXfda
 */

import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar/Navbar";
import ProductForm from "@/components/ui/addproduct";

export default function Component() {
  return (
    <div className="flex-1 w-screen">
      <Navbar />
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0">
          <CardTitle>Seller Information</CardTitle>
          <Button className="ml-auto" size="sm" variant="secondary">
            Edit
          </Button>
        </CardHeader>
        <CardContent className="grid gap-1 text-sm">
          <div className="font-semibold">Acme Inc</div>
          <div className="text-gray-500 dark:text-gray-400">
            Seller ID: 12345
          </div>
          <div>Name: Saakshi Raut</div>
          <div>
            Description: Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book.
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Products</CardTitle>
          <Button>Add New Product +</Button>
          <div className="absolute top-0 w-[700px]">
            <ProductForm />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold">Vaseline</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 py-4">
                  Description of the product. This is a really cool item you
                  should buy.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold">$199</span>
                  <Button size="sm">Delete</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold">Vaseline</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 py-4">
                  Description of the product. This is a really cool item you
                  should buy.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold">$199</span>
                  <Button size="sm">Delete</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold">Vaseline</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 py-4">
                  Description of the product. This is a really cool item you
                  should buy.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold">$199</span>
                  <Button size="sm">Delete</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
