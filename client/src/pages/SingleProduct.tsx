/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rrJCUikjyXg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Demo from "../pages/Demo"

export default function Component() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="py-12 lg:py-16">
        <div className="grid gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-start">
            <div className="flex">
             <Demo />
            </div>
            <div className="flex flex-col gap-4 lg:gap-8 items-start">
              <h1 className="font-bold text-3xl sm:text-5xl tracking-tighter">VASELINE® HEALING JELLY</h1>
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
                <p>Trusted to protect your family’s skin for 150 years. With properties that help accelerate your skin’s natural healing process, the Original Vaseline® Healing Jelly protects and restores your skin and gives it the extra care it needs.</p>
                <p>
                  This 100% pure and triple-purified Vaseline® Jelly is hypoallergenic and helps to heal dry, damaged, and cracked skin. It keeps your skin moisturized by creating a protective barrier and locking in moisture.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <div className="text-4xl font-bold">$99</div>
                <Button size="lg">Add to cart</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
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
  )
}
