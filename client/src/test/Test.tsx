/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CQ5M9D49Wk7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { PaginationPrevious, PaginationItem, PaginationLink, PaginationNext, PaginationContent, Pagination } from "@/components/ui/pagination"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <Link className="flex items-center gap-2" to="#">
          <ShoppingCartIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">E-Shop</span>
        </Link>
        <form className="flex-1 mx-6">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              className="w-full bg-white shadow-none appearance-none pl-8"
              placeholder="Search products..."
              type="search"
            />
          </div>
        </form>
        <nav className="flex items-center gap-4">
          <Link className="text-sm hover:underline" to="#">
            Home
          </Link>
          <Link className="text-sm hover:underline" to="#">
            About
          </Link>
          <Link className="text-sm hover:underline" to="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-4">
            <img
              alt="Product Image"
              className="w-full aspect-square object-cover"
              height={200}
              src="/placeholder.svg"
              width={200}
            />
            <h3 className="text-lg font-semibold">Product Name</h3>
            <p className="text-lg font-bold">$99.99</p>
            <Button>Add to Cart</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-4">
            <img
              alt="Product Image"
              className="w-full aspect-square object-cover"
              height={200}
              src="/placeholder.svg"
              width={200}
            />
            <h3 className="text-lg font-semibold">Product Name</h3>
            <p className="text-lg font-bold">$99.99</p>
            <Button>Add to Cart</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-4">
            <img
              alt="Product Image"
              className="w-full aspect-square object-cover"
              height={200}
              src="/placeholder.svg"
              width={200}
            />
            <h3 className="text-lg font-semibold">Product Name</h3>
            <p className="text-lg font-bold">$99.99</p>
            <Button>Add to Cart</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-4">
            <img
              alt="Product Image"
              className="w-full aspect-square object-cover"
              height={200}
              src="/placeholder.svg"
              width={200}
            />
            <h3 className="text-lg font-semibold">Product Name</h3>
            <p className="text-lg font-bold">$99.99</p>
            <Button>Add to Cart</Button>
          </CardContent>
        </Card>
      </main>
      <footer className="flex items-center justify-center py-4 border-t">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious to="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink to="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext to="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </footer>
    </div>
  )
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
