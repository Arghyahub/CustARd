import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {

  const handleCancel = () =>{
    window.location.reload();
  }
  return (
    <div className="absolute w-screen"><Card>
      <CardHeader>
        <CardTitle className="text-2xl">Add Product</CardTitle>
        <CardDescription>Fill in the details below to add a new product.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name">Product Name</label>
          <Input id="name" placeholder="Enter product name" />
        </div>
        <div className="space-y-2">
          <label htmlFor="description">Description</label>
          <Input className="" id="description" placeholder="Enter product description" />
        </div>
        <div className="space-y-2">
          <label htmlFor="description">AR Link</label>
          <Input className="" id="description" placeholder="Enter product AR link" />
        </div>
          <div className="space-y-4">
              <label htmlFor="price">Price</label>
              <Input id="price" placeholder="Enter price" />
          </div>
        
        <div className="space-y-4">
           
              <label htmlFor="images">Images</label>
              <Input id="images" multiple type="file" />
           
          </div>
      </CardContent>
      <CardFooter className="space-x-4">
        <Button>Save</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </CardFooter>
    </Card></div>
  )
}
