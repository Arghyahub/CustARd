import React, { ReactEventHandler, useState } from 'react'
import Navbar from '@/components/navbar/Navbar'
import nlp from 'compromise';

interface forme {
    target: {
        textar: HTMLTextAreaElement
    }
}

const OurOnlyProduct = [{name: 'vaseline', category: 'cream'}, {name: "Boroline", category: "Cream"}] ;


const Demo = () => {
    const [SelectedProduct, setSelectedProduct] = useState(null) ;
    const [ShowAR, setShowAR] = useState(false) ;
    const [Options, setOptions] = useState([]) ;

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement> & forme) => {
        e.preventDefault() ;
        const text = e.target.textar.value ;
        if (!text || !text.length){
            alert("No text?")
            return;
        }
        // NLP shuru
        const doc = nlp(text);
        // console.log(doc.verbs().toInfinitive().unique().out('array'))
        // console.log(doc.nouns().toSingular().unique().toLowerCase().out('array'))
        const verbs = doc.verbs().toInfinitive().unique().out('array') ; 
        const nouns1 = doc.nouns().toSingular().unique().toLowerCase().out('array') ;

        const nouns = nouns1.concat(verbs) ;


        const match = OurOnlyProduct.filter((elem)=> {
            return nouns.includes(elem.category.toLowerCase());
        })

        if (!match || !match.length){
            alert("No product found")
            return ;
        }

        console.log(match) ;
        setOptions([...match]) ;

        // setSelectedProduct(match[0].name)
    }

  return (
    <div className="flex flex-col w-full h-[95vh]">
        <Navbar />
        <div className="flex flex-row w-full h-full border">
            {/* Left box */}
            <div className="flex flex-col h-full w-full border p-2">
                <div className="flex flex-col h-full w-full">
                    <div className="head flex-flex-row w-full justify-between p-2">
                        <p className="text-xl font-bold">
                            {!SelectedProduct? 'Select a Product':`Selected product ${SelectedProduct.toUpperCase()}`}
                        </p>

                        {SelectedProduct!=null && (
                            <button onClick={() => setShowAR(true)} className='bg-blue-500 py-2 px-3 rounded-lg text-white'>Show AR</button>
                        )}
                    </div>
                    <div className="flex-flex-col overflow-y-auto">
                    
                    <div className="flex flex-col gap-2 my-2">
                        {Options.map((elem,ind) => (
                            <button key={ind} className='my-2 py-2 px-3 bg-green-500 w-20' onClick={() => setSelectedProduct(elem.name)} >{elem.name}</button>
                        ))}
                        
                    </div>

                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <form onSubmit={handleSubmit} className='flex flex-col w-full gap-2'>
                        <textarea name="textar" rows={5} className='border-2 w-full p-1 m-2'  placeholder='Koi bhi sentence likho jisme tum keh rahe ho tumhe Vaseline chahiye'/>
                        <button className="bg-blue-600 py-2 px-4 text-white rounded-md">Send</button>
                    </form>
                </div>
            </div>

            {/* Right box */}
            <div className="flex flex-col justify-center items-center h-full w-full m-2">
                {ShowAR && (
                    //@ts-expect-error nothing
                    <model-viewer 
                        alt={SelectedProduct} 
                        src={`/AR/${SelectedProduct}.glb`} 
                        ar 
                        // environment-image="shared-assets/environments/moon_1k.hdr" 
                        // poster="shared-assets/models/NeilArmstrong.webp" 
                        shadow-intensity="1" 
                        camera-controls 
                        touch-action="pan-y"
                        style={{width: '100%' , height: '300px'}}
                        >
                    {/* @ts-expect-error nothing */}
                    </model-viewer>
                )}
            </div>
        </div>
    </div>
  )
}

export default Demo