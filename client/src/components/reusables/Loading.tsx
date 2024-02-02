import { loadingAtom } from '@/recoil/atom'
import React from 'react'
import { PropagateLoader } from 'react-spinners'
import { useRecoilValue } from 'recoil'

const Loading = () => {
  const { open , text } = useRecoilValue(loadingAtom) ;
  if (!open){
    return <></>
  }
  return (
    <div className='absolute h-screen w-screen bg-black bg-opacity-70 z-10 top-0 flex flex-row justify-center items-center'>
      <div className="flex flex-col items-center justify-center">
        <PropagateLoader 
          color="#36d7b7"
          size={35}
          cssOverride={{ width: '200px' , height: '100px' , justifyContent: 'center', alignItems: 'center' }}
        />
        {text && text.length && (
          <p className='text-center text-white font-semibold text-lg'>{text}</p>
        )}
      </div>
    </div>
  )
}

export default Loading