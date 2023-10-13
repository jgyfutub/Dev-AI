import React from "react";
import UserNavigation from "../components/UserNavigation";
import { useNavigate } from "react-router-dom";
export default function Result(){
    const navigate=useNavigate()
    return (
        <div>
            <UserNavigation/>
            <h1 className="text-center text-2xl font-bold whitespace-nowrap  " style={{marginTop:110}}>
                Result
              </h1>
            <p style={{textAlign:'center', marginInline:'10%',marginTop:'40px'}}>**Germanium** is a chemical element with the symbol Ge and atomic number 32. It is a lustrous, hard, grayish-white metalloid that resembles tin in its chemical properties. Germanium is an essential element in the Earth's crust and is found in various minerals, although it is relatively rare. It was discovered by Clemens Winkler in 1886. Germanium is mainly produced as a byproduct of zinc and copper refining. Its favorable conditions for growth are primarily within geological formations rich in these metals, which typically form in hydrothermal veins. It has an abundance of about 1.6 parts per million in the Earth's crust, making it more abundant than precious metals like gold and silver. In recent years, the demand for germanium has increased due to its applications in the electronics and solar energy industries.

        Germanium has numerous applications, primarily in the fields of electronics and optics. One of its most well-known uses is in the manufacture of semiconductors. Germanium was one of the earliest materials used in the production of transistors and other electronic devices, paving the way for modern microelectronics. While silicon has largely replaced germanium in these applications, germanium remains important in specialized electronics.

        In addition to semiconductors, germanium is used in optical materials. Germanium oxide is utilized in the production of high-quality optical glass. It has a high refractive index, which makes it valuable for lenses and optical fibers. Germanium is also used in infrared (IR) spectroscopes and thermal imaging systems. 
        z
        Germanium's role in the field of photovoltaics is growing. It is a key component in some types of solar cells, such as thin-film and multi-junction cells. These cells are used in high-efficiency solar panels. The favorable conditions for the growth of the solar industry are also conducive to germanium production. 

        Moreover, germanium is employed in the production of certain types of alloys and phosphors used in fluorescent lamps. The element also has applications in fiber optic systems and in various types of sensors.

        Germanium's health benefits have also been explored. Some studies suggest that it may have a role in the prevention of certain diseases. However, more research is needed to confirm these potential health uses.

        In conclusion, germanium, a relatively rare element in the Earth's crust, plays a significant role in the fields of electronics, optics, and renewable energy. Its favorable growth conditions are found within geological formations rich in metals like zinc and copper. As technology continues to advance, germanium is likely to remain a valuable and versatile element with various applications in modern industry.</p>
            <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
            <button style={{backgroundColor:'black',color:'white',paddingBlock:20,paddingInline:30}} onClick={()=>{navigate('/dashboard')}}>back to Dashboard</button>
            </div>
        </div>
    )
}