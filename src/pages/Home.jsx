import React, { useState,useEffect } from 'react';
import CountryCard from '../components/CountryCard';
import '../App.css';

function Home() {
    const [input, setInput] = useState('');
    const [list,setList] = useState([]);
    const [searchList,setSearchList] = useState([]);
    const [error,setError] = useState('')

    
      useEffect(() => {
        const queryFetch =  async () => {
            const res = await fetch('https://countries.trevorblades.com/', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `
                query {
                    countries{
                     name
                     code
                     emoji
                     continent{
                       name
                     }
                   }
                   }
              `
                })
            });
            const data = await res.json();
            setList(data.data.countries);}
            queryFetch()
      }, [])

      const search =()=>{
        if(input==''){
            setError('Enter Valid Keyword')
        }else{
            setError('Country not found')
        }
        const newList = list.filter(country=>{
          return country.name.toLowerCase().includes(input.toLowerCase());
        })
        setSearchList(newList)
      }


  return (
    <div className='border-2 border-black border-solid w-[90%] lg:w-2/5 mx-auto mt-4 h-[90vh] '>
        <div className='flex border-b-2 border-b-black border-b-solid items-center w-full'>
            <div className='flex w-full pl-2 items-center '>
                <div className='w-[35%]'>
                   <span className='ml-2'>O</span>
                   <span className='ml-2'>O</span>
                   <span className='ml-2'>O</span>
                </div>
                <h1 className=' font-thin text-[#ccc] self-center '>Countries Catalog</h1>
            </div>
        </div>
        <div className='border-b-2 border-b-black border-b-solid px-3 md:px-8 py-4'>
            <h1 className='font-semibold text-2xl'>Keyword</h1>
            <div className='w-[90%] flex items-center'>
                <input type="text" className='border-2 border-black border-solid w-4/6 py-[0.21rem] px-2 font-semibold text-xl'  value={input} onChange={(e) => {setInput(e.target.value);setError('')}}/>
                <button type="submit" className='bg-black py-[0.27rem] px-6 text-white text-xl ml-1 ' id='search' onClick={search}>search</button>
            </div>      
        </div>
        <div className='flex flex-col lg:px-2 h-[77%] overflow-y-scroll w-full'>
            {
                searchList.length>0 && input !== ''? searchList.map(country=>{
                    return  <CountryCard key={country.code}  {...country} />
                }): <p className='mt-4 mx-auto'>{error}</p>
            }  
        </div>
    </div>
  )
}

export default Home