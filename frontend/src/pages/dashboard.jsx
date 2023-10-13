import React ,{useState} from "react";
import UserNavigation from "../components/UserNavigation";
import axios from "axios";

export default function Dashboard(){
    const [images,setimages]=useState([])
    const handleImageInput=(event)=>{
        const file=event.target.files[0]
        setimages([...images,file])
        console.log(images)
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append('image',images[0])
        console.log(formdata)
        const senddata=await axios.post(' http://127.0.0.1:5000/plantdetection/',formdata, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }})
        const sendata=await senddata.json()
        console.log(senddata)
        window.location.reload()
    }
    return (
        <div>
        <UserNavigation/>
            <div style={{display:'flex',justifyContent:'center',marginTop:'200px',gap:20}}>
            <form onSubmit={handleSubmit}>
            <p style={{backgroundColor:'black',color:'white',paddingBlock:20,paddingInline:30 ,borderRadius:10,marginBottom:20}} >Upload Image in Choose file button below</p>
            <input  type="file" onChange={handleImageInput}/>
            <button  className="text-5xl" >🔍</button>
            </form>
            </div>
        </div>
    )
}