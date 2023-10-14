import React from 'react'
import Navigation from '../components/Navigation'
export default function Payment(){
    return (
        <div>
            <Navigation/>
            <div className="mt-32 "style={{display:'grid',justifyContent:'center'}}  >
                <p className='text-2xl'> Yearly plan: $120 per year</p>
                <button className='bg-cyan-100 pl-8 pr-8 pt-4 pb-4 text-3xl hover:bg-cyan-300 mt-8 mb-8 rounded-xl'>Click here</button>
                <p className='text-2xl'>Monthly plan: $10 per year</p>
                <button className='bg-cyan-100 pl-8 pr-8 pt-4 pb-4 text-3xl hover:bg-cyan-300 mt-8 mb-8 rounded-xl'>Click here</button>
            </div>
        </div>
    )
}