import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface DataElemType {
  img?: string,
  text?: string,
  orHtml?: JSX.Element    // Say you wan to put a line in between
}
interface ImgTxtProp {
  DataArr: DataElemType[],
  txtClassname?: string,
  imgClassname?: string,
  cardAspectClass?: string, // Can be used to change aspect ratio or card style change
  className?: string
}

export default function ImgTxtCarousel({DataArr, txtClassname='', imgClassname='', cardAspectClass='', className=''}:ImgTxtProp) {
  return (
    <Carousel className={cn("w-full max-w-[250px] md:max-w-[270px] lg:max-w-[320px]",className)}>
      <CarouselContent>
        {DataArr.map((elem, index) => (
          <CarouselItem key={index}>
            {/* <div className="p-1"> */}
              <Card>
                <CardContent className={cn("flex aspect-square items-center justify-center p-6",cardAspectClass)}>

                <div className="flex flex-col h-full w-full justify-center items-center gap-2 max-w-full">
                  {elem.img && <img src={elem.img} alt='Carousel img' className={cn('w-5/6 h-5/6 object-contain',imgClassname)} />}
                  {elem.text && <p className={txtClassname}>{elem.text}</p>}
                  {elem.orHtml && elem.orHtml}
                </div>

                </CardContent>
              </Card>
            {/* </div> */}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-black" />
      <CarouselNext className="text-black" />
    </Carousel>
  )
}
