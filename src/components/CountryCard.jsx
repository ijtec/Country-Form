import React from 'react'

function CountryCard({name,continent,emoji}) {

  return (
    <div className='pl-6 pt-2'>
        <div className='flex items-center'>
            <span>{emoji}</span>
            <h1 className='font-semibold text-xl ml-2'>{name}</h1>
        </div>
        <div className='flex items-center mt-[1px]  font-semibold text-xl'>
            <h1>Continent:</h1>
            <span className='ml-1'>{continent.name}</span>
        </div>
        <button className='bg-black mt-[1px] text-white text-lg py-1 px-4'>see details...</button>
    </div>
  )
}
export default CountryCard