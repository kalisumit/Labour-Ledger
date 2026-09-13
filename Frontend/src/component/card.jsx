import React from 'react'

const Card = ({title,data}) => {
  return (
      <div className='text-white bg-[#222022] my-2 mx-1 px-3 py-2 rounded-md flex flex-col gap-2 justify-center items-center'>
        <h1 className='font-bold text-2xl'>{title}</h1>
          <p className='text-white text-xl'>{data}</p>
    </div>
  )
}

export default Card